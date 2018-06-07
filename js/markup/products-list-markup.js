import {createProductMarkup} from "./product-markup";

export const createProductsListMarkup = (products) => {
  let productsMarkup;
  if (!products) {
    productsMarkup = `
    <p style="font-size: 24px; font-weight: bold;">
      Загружаем объявления...
    </p>`.trim();
  } else if (products.length) {
    productsMarkup = products.reduce((acc, curProduct) => {
      return acc + createProductMarkup(curProduct);
    }, ``);
  } else {
    productsMarkup = `
    <p style="font-size: 24px; font-weight: bold;">
      К сожалению, подходящих вариантов нет
    </p>`.trim();
  }

  return `
  <section class="layout-main products-list">
    ${productsMarkup}
  </section>`.trim();
};
