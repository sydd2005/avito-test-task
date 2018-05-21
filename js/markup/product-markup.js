export const createProductMarkup = (productModel) => {
  return `
    <article class="products-list-item product">
      <picture class="product-pic">
        <a href="#" class="product-pic-number">${productModel.pictures.length}</a>
        <img src="${productModel.pictures[0]}" width="120">
      </picture>
      <div class="product-description">
        <button class="product-favorite">Добавить в избранное</button>
        <h3 class="product-title"><a href="#">${productModel.title}</a></h3>
        <p class="product-price">${productModel.price}&nbsp;₽</p>
        <p class="product-address">${productModel.address}</p>
        <p class="product-date">три дня назад</p>
      </div>
    </article>`.trim();
};
