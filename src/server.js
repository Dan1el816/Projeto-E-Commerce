import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Permite que o Express leia dados enviados via JSON (APIs)
app.use(express.json());

// 1. Serve os arquivos estáticos gerados pelo build do React (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "..", "dist"))); // ou "build"

// 2. SUAS ROTAS DE API (retornam dados JSON em vez de HTML)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Lógica de autenticação no banco de dados...
  res.json({ message: "Login realizado com sucesso!" });
});

// 3. ROTA CURINGA (Catch-all):
// Qualquer rota que não seja de API entrega o mesmo index.html do React.
// O React Router no navegador decide se desenha a Home, Login ou Dashboard.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Servidor no ar na porta 3000");
});