import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Não foi possível entrar.");
      } else {
        navigate("/home");
      }
    } catch {
      setError("Não foi possível conectar ao servidor. Tente novamente.");
    }
  }

  return (
    <main className="login-wrapper">
      <a className="brand" href="/">Shoply</a>
      <section className="login-card">
        <p className="eyebrow">Bem-vindo de volta</p>
        <h1>Entre na sua conta</h1>
        <p className="muted-text">Acesse seus pedidos e acompanhe suas escolhas.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            autoComplete="off" 
            placeholder="voce@exemplo.com" 
            required 
          />

          <label htmlFor="password">Senha</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            autoComplete="off" 
            placeholder="Digite sua senha" 
            required 
          />

          <button className="button" type="submit">Entrar</button>
        </form>
        {error && <p role="alert">{error}</p>}
      </section>
    </main>
  );
}

export default Login;