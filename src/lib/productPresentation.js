const productImages = {
  clothing: "photo-1596755094514-f87e34085b2c",
  bag: "photo-1548036328-c9fa89d128fa",
  bagNatural: "photo-1590874103328-eac38a683ce7",
  shoe: "photo-1608231387042-66d1773070a5",
  shoeRed: "photo-1542291026-7eec264c27ff",
  accessory: "photo-1611652022419-a9419f74343d",
  watch: "photo-1523275335684-37898b6baf30",
  perfume: "photo-1541643600914-78b084683601",
  headphones: "photo-1505740420928-5e560c06d30e",
  glasses: "photo-1511499767150-a48a237f0083",
};

export function getProductImage(name = "", description = "") {
  const normalizedText = `${name} ${description}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (/\b(oculos|armacao|lente)\b/.test(normalizedText)) {
    return productImages.glasses;
  }

  if (/\b(bolsa|mochila|carteira)\b/.test(normalizedText)) {
    if (/\b(natural|caramelo|palha|trama)\b/.test(normalizedText)) {
      return productImages.bagNatural;
    }

    return productImages.bag;
  }

  if (/\b(tenis|sapato|calcado|bota|sandalia)\b/.test(normalizedText)) {
    if (/\b(vermelho|vermelha|red)\b/.test(normalizedText)) {
      return productImages.shoeRed;
    }

    return productImages.shoe;
  }

  if (/\b(relogio)\b/.test(normalizedText)) {
    return productImages.watch;
  }

  if (/\b(perfume|fragrancia)\b/.test(normalizedText)) {
    return productImages.perfume;
  }

  if (/\b(fone|headphone|audio)\b/.test(normalizedText)) {
    return productImages.headphones;
  }

  if (/\b(acessorio|colar|brinco|pulseira|anel)\b/.test(normalizedText)) {
    return productImages.accessory;
  }

  if (/\b(camisa|blusa|calca|vestido|roupa|linho|algodao)\b/.test(normalizedText)) {
    return productImages.clothing;
  }

  return productImages.clothing;
}
