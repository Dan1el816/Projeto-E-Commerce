import React from "react";

function Login() {
  return (
    <main className="login-wrapper">
      <a className="brand" href="/">Shoply</a>
      <section className="login-card">
        <p className="eyebrow">Bem-vindo de volta</p>
        <h1>Entre na sua conta</h1>
        <p className="muted-text">Acesse seus pedidos e acompanhe suas escolhas.</p>

        <form className="login-form" action="/login" method="post">
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
      </section>
    </main>
  );
}

export default Login;