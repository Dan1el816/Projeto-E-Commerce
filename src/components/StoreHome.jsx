function StoreHome() {
  return (
    <div className="store-home">
      <div className="store-announcement">
        Frete grátis na primeira compra acima de R$ 199
      </div>

      <header className="store-header">
        <a className="store-brand" href="/">shoply<span>.</span></a>
        <nav className="store-navigation" aria-label="Categorias da loja">
          <a href="#novidades">Novidades</a>
          <a href="#categorias">Categorias</a>
          <a href="#sobre">Nossa história</a>
        </nav>
        <div className="store-header-actions">
          <a className="store-search" href="#novidades" aria-label="Explorar produtos">
            <span aria-hidden="true">⌕</span>
            <span>O que você procura?</span>
          </a>
          <a className="store-cart" href="#novidades" aria-label="Sacola de compras">
            <span aria-hidden="true">♧</span>
          </a>
        </div>
      </header>

      <main>
        <section className="store-hero">
          <div className="store-hero-copy">
            <p className="store-kicker">Feito para o seu dia a dia</p>
            <h1>Pequenas escolhas.<br />Grandes momentos.</h1>
            <p className="store-hero-text">
              Descubra peças especiais para deixar a rotina mais leve, bonita e com a sua cara.
            </p>
            <a className="store-button" href="#novidades">
              Encontre seus favoritos <span aria-hidden="true">→</span>
            </a>
            <div className="store-hero-note">
              <span className="store-note-star" aria-hidden="true">✳</span>
              Curadoria especial, feita com carinho.
            </div>
          </div>
          <div className="store-hero-image">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
              alt="Seleção de roupas em tons naturais"
            />
            <div className="store-image-caption">
              <span>COLEÇÃO</span>
              <strong>Essenciais de todo dia</strong>
            </div>
            <span className="store-hero-sticker" aria-hidden="true">feito<br />pra você</span>
          </div>
        </section>

        <section className="store-categories" id="categorias">
          <div className="store-section-heading">
            <div>
              <p className="store-kicker">Explore com calma</p>
              <h2>Um cantinho para cada estilo</h2>
            </div>
            <a className="store-text-link" href="#novidades">Ver tudo <span aria-hidden="true">→</span></a>
          </div>
          <div className="store-category-grid">
            <a className="store-category store-category-fashion" href="#novidades">
              <span>01 / vestir</span><strong>Moda & acessórios</strong><i aria-hidden="true">↗</i>
            </a>
            <a className="store-category store-category-home" href="#novidades">
              <span>02 / morar</span><strong>Casa & decoração</strong><i aria-hidden="true">↗</i>
            </a>
            <a className="store-category store-category-lifestyle" href="#novidades">
              <span>03 / viver</span><strong>Bem-estar</strong><i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>

        <section className="store-products" id="novidades">
          <div className="store-section-heading">
            <div>
              <p className="store-kicker">Acabaram de chegar</p>
              <h2>Novidades que encantam</h2>
            </div>
            <a className="store-text-link" href="#categorias">Ver coleção <span aria-hidden="true">→</span></a>
          </div>
          <div className="store-product-grid">
            <article className="store-product-card">
              <a className="store-product-image" href="#novidades">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85" alt="Tênis esportivo vermelho" />
                <span className="store-product-tag">Novidade</span>
              </a>
              <div className="store-product-info">
                <div><h3>Tênis movimento</h3><p>Conforto para ir mais longe</p></div>
                <strong>R$ 289,90</strong>
              </div>
            </article>
            <article className="store-product-card">
              <a className="store-product-image store-product-sand" href="#novidades">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85" alt="Relógio minimalista com pulseira escura" />
                <span className="store-product-tag">Favorito</span>
              </a>
              <div className="store-product-info">
                <div><h3>Relógio essencial</h3><p>Design que combina com tudo</p></div>
                <strong>R$ 349,00</strong>
              </div>
            </article>
            <article className="store-product-card">
              <a className="store-product-image store-product-rose" href="#novidades">
                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85" alt="Frasco de perfume em fundo delicado" />
                <span className="store-product-tag">Feito para presentear</span>
              </a>
              <div className="store-product-info">
                <div><h3>Perfume momentos</h3><p>Uma fragrância para lembrar</p></div>
                <strong>R$ 179,90</strong>
              </div>
            </article>
            <article className="store-product-card">
              <a className="store-product-image store-product-sage" href="#novidades">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85" alt="Fones de ouvido em destaque" />
                <span className="store-product-tag">Últimas peças</span>
              </a>
              <div className="store-product-info">
                <div><h3>Fone som leve</h3><p>Seu mundo, sua trilha sonora</p></div>
                <strong>R$ 229,90</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="store-about" id="sobre">
          <span className="store-about-symbol" aria-hidden="true">✳</span>
          <p className="store-kicker">O jeito Shoply de escolher</p>
          <h2>Menos excesso.<br />Mais coisas que fazem sentido.</h2>
          <p>Reunimos produtos especiais para acompanhar a vida real — com beleza, cuidado e um toque de surpresa.</p>
          <a className="store-text-link" href="#categorias">Conheça a seleção <span aria-hidden="true">→</span></a>
        </section>
      </main>

      <footer className="store-footer">
        <a className="store-brand" href="/">shoply<span>.</span></a>
        <p>Escolhas que combinam com você.</p>
        <span>© 2026 Shoply. Feito com carinho.</span>
      </footer>
    </div>
  );
}

export default StoreHome;
