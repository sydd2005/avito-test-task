export const createProductMarkup = (productModel) => {
  const favoriteStyle = productModel.isFavorite
    ? `style="text-shadow: 3px 0 4px red, -3px 0 4px red, 0 -3px 4px red, 0 3px 4px red"`
    : ``;
  return `
    <article class="products-list-item product">
      <picture class="product-pic">
        <a href="#" class="product-pic-number">${productModel.pictures.length}</a>
        <img src="${productModel.pictures[0]}" width="120">
      </picture>
      <div class="product-description">
        <button class="product-favorite" data-product-id="${productModel.id}" ${favoriteStyle}>Добавить в избранное</button>
        <h3 class="product-title"><a href="#">${productModel.title}</a></h3>
        <p class="product-price">${productModel.price}</p>
        <p class="product-address">${productModel.shortAddress}</p>
        <p class="product-date">три дня назад</p>
      </div>
    </article>`.trim();
};
