import React from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../lib/productPresentation";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function StoreHome() {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [productError, setProductError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/produtos");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Não foi possível carregar os produtos.");
        }

        if (!Array.isArray(result.products)) {
          throw new Error("A resposta do servidor não contém a lista de produtos.");
        }

        if (isMounted) {
          setProducts(result.products);
        }
      } catch (error) {
        if (isMounted) {
          setProductError(error.message || "Não foi possível conectar ao servidor.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

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
            <Link className="store-category store-category-fashion" to="/categoria/moda-acessorios">
              <span>01 / vestir</span><strong>Moda & acessórios</strong><i aria-hidden="true">↗</i>
            </Link>
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
            <Link className="store-text-link" to="/categoria/moda-acessorios">Ver coleção <span aria-hidden="true">→</span></Link>
          </div>
          <div className="store-product-grid">
            {productError && (
              <p className="store-product-message" role="alert">{productError}</p>
            )}
            {isLoading && (
              <p className="store-product-message" role="status">Carregando produtos...</p>
            )}
            {!isLoading && !productError && products.length === 0 && (
              <p className="store-product-message" role="status">Nenhum produto foi encontrado.</p>
            )}
            {products.map((product) => (
              <article className="store-product-card" key={product.id}>
                <Link
                  className="store-product-image"
                  to={`/produtos/${product.id}`}
                  aria-label={`Ver detalhes de ${product.nome}`}
                >
                  <img
                    src={`https://images.unsplash.com/${getProductImage(product.nome, product.descricao)}?auto=format&fit=crop&w=800&q=85`}
                    alt={product.nome}
                    loading="lazy"
                  />
                </Link>
                <div className="store-product-info">
                  <div>
                    <h3><Link className="store-product-title" to={`/produtos/${product.id}`}>{product.nome}</Link></h3>
                    <p>{product.descricao}</p>
                  </div>
                  <strong>{currencyFormatter.format(Number(product.preco))}</strong>
                </div>
              </article>
            ))}
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
