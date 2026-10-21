import React from "react";
import { Link, useParams } from "react-router-dom";
import { getProductImage } from "../lib/productPresentation";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [productError, setProductError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setIsLoading(true);
      setProductError("");

      try {
        const response = await fetch(`/api/produtos/${encodeURIComponent(id)}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Não foi possível carregar este produto.");
        }

        if (!result.product) {
          throw new Error("A resposta do servidor não contém os dados do produto.");
        }

        if (isMounted) {
          setProduct(result.product);
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

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="store-home product-page">
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
          <Link className="store-search" to="/categoria/moda-acessorios" aria-label="Explorar produtos">
            <span aria-hidden="true">⌕</span>
            <span>O que você procura?</span>
          </Link>
        </div>
      </header>

      <main className="product-detail">
        {isLoading && (
          <p className="product-state" role="status">Preparando os detalhes do produto...</p>
        )}

        {!isLoading && productError && (
          <section className="product-state product-state-error" role="alert">
            <p className="store-kicker">Não encontramos o que você procura</p>
            <h1>Produto indisponível</h1>
            <p>{productError}</p>
            <Link className="store-button" to="/categoria/moda-acessorios">
              Voltar para a coleção <span aria-hidden="true">→</span>
            </Link>
          </section>
        )}

        {!isLoading && product && (
          <>
            <nav className="product-breadcrumb" aria-label="Você está em">
              <Link to="/home">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categoria/moda-acessorios">Moda & acessórios</Link>
              <span aria-hidden="true">/</span>
              <span>{product.nome}</span>
            </nav>

            <section className="product-showcase">
              <div className="product-showcase-image">
                <img
                  src={`https://images.unsplash.com/${getProductImage(product.nome, product.descricao)}?auto=format&fit=crop&w=1200&q=90`}
                  alt={product.nome}
                />
                <span className="product-image-label">CURADORIA SHOPLY</span>
              </div>

              <div className="product-showcase-copy">
                <p className="store-kicker">Um achado para chamar de seu</p>
                <p className="product-reference">PRODUTO Nº {product.id}</p>
                <h1>{product.nome}</h1>
                <p className="product-description">
                  {product.descricao || "Uma escolha especial, pensada para acompanhar você no dia a dia."}
                </p>

                <div className="product-price">
                  {currencyFormatter.format(Number(product.preco))}
                </div>
                <p className="product-stock">
                  <span aria-hidden="true">✳</span>
                  {Number(product.estoque) > 0
                    ? "Disponível em nossa seleção"
                    : "Produto indisponível no momento"}
                </p>

                <button className="product-buy-button" type="button" disabled>
                  Compra em breve
                </button>
                <p className="product-buy-note">
                  Estamos preparando uma experiência especial para você.
                </p>

                <div className="product-promise">
                  <span aria-hidden="true">✦</span>
                  <p><strong>Escolhas que fazem sentido.</strong><br />Uma curadoria feita com carinho, para a vida real.</p>
                </div>
              </div>
            </section>

            <div className="product-back-link">
              <Link className="store-text-link" to="/categoria/moda-acessorios">
                <span aria-hidden="true">←</span> Voltar para Moda & acessórios
              </Link>
            </div>
          </>
        )}
      </main>

      <footer className="store-footer">
        <Link className="store-brand" to="/">shoply<span>.</span></Link>
        <p>Escolhas que combinam com você.</p>
        <span>© 2026 Shoply. Feito com carinho.</span>
      </footer>
    </div>
  );
}

export default ProductDetail;
