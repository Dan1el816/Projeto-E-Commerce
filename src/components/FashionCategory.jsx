import { Link } from "react-router-dom";
import React from "react";
import { getProductImage } from "../lib/productPresentation";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function FashionCategory() {
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
    <div className="store-home fashion-page">
      <div className="store-announcement">
        Frete grátis na primeira compra acima de R$ 199
      </div>

      <header className="store-header">
        <Link className="store-brand" to="/">shoply<span>.</span></Link>
        <nav className="store-navigation" aria-label="Categorias da loja">
          <Link to="/home#novidades">Novidades</Link>
          <Link to="/home#categorias">Categorias</Link>
          <Link to="/home#sobre">Nossa história</Link>
        </nav>
        <div className="store-header-actions">
          <Link className="store-search" to="/home#novidades" aria-label="Explorar produtos">
            <span aria-hidden="true">⌕</span>
            <span>O que você procura?</span>
          </Link>
          <Link className="store-cart" to="/home#novidades" aria-label="Sacola de compras">
            <span aria-hidden="true">♧</span>
          </Link>
        </div>
      </header>

      <main>
        <section className="fashion-hero">
          <div className="fashion-hero-copy">
            <nav className="fashion-breadcrumb" aria-label="Você está em">
              <Link to="/home">Início</Link>
              <span aria-hidden="true">/</span>
              <span>Moda & acessórios</span>
            </nav>
            <p className="store-kicker">Vista o que faz sentido</p>
            <h1>Seu estilo,<br />do seu jeito.</h1>
            <p>
              Peças para acompanhar seus dias com leveza. Escolhas especiais,
              combinações sem esforço e detalhes que têm tudo a ver com você.
            </p>
            <a className="store-button" href="#fashion-collection">
              Explore a coleção <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="fashion-hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="Amigas explorando peças de moda em uma loja"
            />
            <span className="fashion-image-note">Uma coleção para<br />ser você mesma.</span>
          </div>
        </section>

        <section className="fashion-collection" id="fashion-collection">
          <div className="fashion-collection-intro">
            <div>
              <p className="store-kicker">Escolhidos para você</p>
              <h2>Moda & acessórios</h2>
              <p>Uma seleção de produtos para acompanhar a vida real.</p>
            </div>
            <span className="fashion-item-count">
              {products.length} {products.length === 1 ? "peça" : "peças"}
            </span>
          </div>

          <div className="fashion-category-chips" aria-label="Tipos de produtos">
            <span className="fashion-chip fashion-chip-active">Tudo</span>
            <span className="fashion-chip">Roupas</span>
            <span className="fashion-chip">Bolsas</span>
            <span className="fashion-chip">Acessórios</span>
            <span className="fashion-chip">Calçados</span>
          </div>

          <div className="fashion-product-grid">
            {productError && (
              <p className="fashion-product-message" role="alert">{productError}</p>
            )}
            {isLoading && (
              <p className="fashion-product-message" role="status">Carregando a coleção...</p>
            )}
            {!isLoading && !productError && products.length === 0 && (
              <p className="fashion-product-message" role="status">
                Nenhum produto foi encontrado.
              </p>
            )}
            {products.map((product) => (
              <article className="fashion-product-card" key={product.id}>
                <Link
                  className="fashion-product-image"
                  to={`/produtos/${product.id}`}
                  aria-label={`Ver detalhes de ${product.nome}`}
                >
                  <img
                    src={`https://images.unsplash.com/${getProductImage(product.nome, product.descricao)}?auto=format&fit=crop&w=800&q=85`}
                    alt={product.nome}
                    loading="lazy"
                  />
                </Link>
                <div className="fashion-product-info">
                  <div>
                    <h3><Link className="fashion-product-title" to={`/produtos/${product.id}`}>{product.nome}</Link></h3>
                    <p>{product.descricao}</p>
                  </div>
                  <strong>{currencyFormatter.format(Number(product.preco))}</strong>
                </div>
                <Link className="fashion-product-button" to={`/produtos/${product.id}`}>
                  Ver detalhes
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="fashion-note">
          <span aria-hidden="true">✳</span>
          <p>Menos pressa para seguir tendências.<br /><strong>Mais espaço para encontrar o seu jeito.</strong></p>
          <Link className="store-text-link" to="/home">Voltar para a loja <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <footer className="store-footer">
        <Link className="store-brand" to="/">shoply<span>.</span></Link>
        <p>Escolhas que combinam com você.</p>
        <span>© 2026 Shoply. Feito com carinho.</span>
      </footer>
    </div>
  );
}

export default FashionCategory;
