import React from "react";
import { Link } from "react-router-dom"; // Importante para navegação sem recarregar a página

function Home() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/">Shoply</Link>
        <nav className="navigation" aria-label="Navegação principal">
          <Link to="/">Início</Link>
          <Link to="/login">Entrar</Link>
          <Link to="/cadastro">Criar conta</Link>
        </nav>
      </header>
 
      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">Sua próxima descoberta</p>
          <h1>Escolhas que combinam com você.</h1>
          <p className="hero-text">
            Encontre produtos pensados para deixar sua rotina mais simples, bonita e do seu jeito.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/login">Começar agora</Link>
            <Link className="button button-secondary" to="/cadastro">Criar conta</Link>
          </div>
        </div>
        <div className="hero-shape" aria-hidden="true"></div>
      </main>
    </>
  );
}

export default Home;