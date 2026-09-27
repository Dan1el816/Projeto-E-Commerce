import React from "react";

function Cadastro() {
  return (
    <main className="login-wrapper">
      <a className="brand" href="/">Shoply</a>
      <section className="login-card">
        <p className="eyebrow">Comece agora</p>
        <h1>Crie sua conta</h1>
        <p className="muted-text">Cadastre-se para acompanhar seus pedidos e salvar suas preferências.</p>

        <form className="login-form" action="/cadastro" method="post">
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
      </section>
    </main>
  );
}

export default Cadastro;