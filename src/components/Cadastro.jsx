import React from "react";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  async function handleCadastro(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Não foi possível criar a conta.");
        return;
      }

      navigate("/home");
    } catch {
      setError("Não foi possível conectar ao servidor. Tente novamente.");
    }
  }

  return (
    <main className="login-wrapper">
      <a className="brand" href="/">Shoply</a>
      <section className="login-card">
        <p className="eyebrow">Comece agora</p>
        <h1>Crie sua conta</h1>
        <p className="muted-text">Cadastre-se para acompanhar seus pedidos e salvar suas preferências.</p>

        <form className="login-form" onSubmit={handleCadastro}>
          <label htmlFor="name">Nome completo</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            placeholder="Seu nome"
            required
          />

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
            placeholder="Crie uma senha"
            required
          />

          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="off"
            placeholder="Repita sua senha"
            required
          />

          <button className="button" type="submit">Criar conta</button>
        </form>
        {error && <p role="alert">{error}</p>}
      </section>
    </main>
  );
}

export default Cadastro;