import { pool } from "./db.js";

try {
  const [rows] = await pool.query(
    "SELECT DATABASE() AS banco, CURRENT_USER() AS usuario"
  );

  console.log("Conexão funcionando!");
  console.log(rows);
} catch (error) {
  console.error("Erro na conexão:", error.message);
} finally {
  await pool.end();
}
