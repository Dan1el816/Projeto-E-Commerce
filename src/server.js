import express from "express";
import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { pool } from "./lib/db.js";

const app = express();
const scrypt = promisify(scryptCallback);
const passwordKeyLength = 64;
const sessionLifetime = 7 * 24 * 60 * 60 * 1000;

function createSessionToken(userId) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET precisa ter pelo menos 32 caracteres.");
  }

  const payload = Buffer.from(JSON.stringify({
    userId,
    expiresAt: Date.now() + sessionLifetime,
  })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

async function verifyPassword(password, storedPassword) {
  const match = typeof storedPassword === "string"
    ? /^([a-f\d]{32}):([a-f\d]{128})$/i.exec(storedPassword)
    : null;

  if (!match) {
    throw new Error("Formato de senha inválido na coluna usuarios.senha.");
  }

  const [, salt, savedHash] = match;
  const enteredHash = await scrypt(password, salt, passwordKeyLength);
  const savedHashBuffer = Buffer.from(savedHash, "hex");

  return timingSafeEqual(enteredHash, savedHashBuffer);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Permite que o Express leia dados enviados via JSON (APIs)
app.use(express.json());

// 1. Serve os arquivos estáticos gerados pelo build do React (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "..", "dist"))); // ou "build"

// 2. SUAS ROTAS DE API (retornam dados JSON em vez de HTML)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password) {
    return res.status(400).json({ message: "Informe o e-mail e a senha." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: "Informe um e-mail válido." });
  }

  try {
    const [users] = await pool.execute(
      "SELECT id, email, senha FROM usuarios WHERE email = ? LIMIT 1",
      [normalizedEmail],
    );

    if (!users.length) {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }

    if (!await verifyPassword(password, users[0].senha)) {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }

    return res.json({
      message: "Senha verificada com sucesso.",
      user: {
        id: users[0].id,
        email: users[0].email,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar usuário para login:", error);
    return res.status(500).json({ message: "Não foi possível processar o login." });
  }
});


app.post("/api/cadastro", async (req, res) => {
  const { email, password, name } = req.body ?? {};

  if (typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password ||
      typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "Informe o e-mail, senha ou nome correto." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: "Informe um e-mail válido." });
  }

  try {
    const salt = randomBytes(16).toString("hex");
    const passwordHash = await scrypt(password, salt, passwordKeyLength);
    const storedPassword = `${salt}:${passwordHash.toString("hex")}`;
    const [result] = await pool.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [name.trim(), normalizedEmail, storedPassword],
    );

    return res.status(201).json({
      message: "Conta criada com sucesso.",
      user: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
      },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Este e-mail já está cadastrado." });
    }

    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ message: "Não foi possível criar a conta." });
  }
});

// 3. ROTA CURINGA (Catch-all):
// Qualquer rota que não seja de API entrega o mesmo index.html do React.
// O React Router no navegador decide se desenha a Home, Login ou Dashboard.
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Servidor no ar na porta 3000");
});
