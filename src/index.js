import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use(express.static(path.join(__dirname, "..", "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

app.get("/dashboard",(req,es)=>{
    res.sendFile(path.join(__dirname, "..", "views", "dashboard.html"));
})

app.listen(3000, () => {
  console.log("Servidor no ar, porta 3000");
});