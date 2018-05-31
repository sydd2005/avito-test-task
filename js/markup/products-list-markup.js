import {createProductMarkup} from "./product-markup";

export const createProductsListMarkup = (products) => {
  const productsMarkup = products.reduce((acc, curProduct) => {
    return acc + createProductMarkup(curProduct);
  }, ``);
  return `
  <section class="layout-main products-list">
    ${productsMarkup}
  </section>`.trim();
};

//     `
//   <article class="products-list-item product">
//       <picture class="product-pic">
//         <a href="#" class="product-pic-number">10</a>
//         <img src="" width="120">
//       </picture>
//       <div class="product-description">
//         <button class="product-favorite">Добавить в избранное</button>
//         <h3 class="product-title"><a href="#">Квартира на Невском</a></h3>
//         <p class="product-price">8&thinsp;000&thinsp;000&nbsp;₽</p>
//         <p class="product-address">м.&nbsp;Купчино, улица Лётчика Иванова, 3</p>
//         <p class="product-date">три дня назад</p>
//       </div>
//     </article>

//     <article class="products-list-item product">
//       <picture class="product-pic">
//         <a href="#" class="product-pic-number">10</a>
//         <img src="" width="120">
//       </picture>
//       <div class="product-description">
//         <button class="product-favorite">Добавить в избранное</button>
//         <h3 class="product-title"><a href="#">Квартира на Невском</a></h3>
//         <p class="product-price">8&thinsp;000&thinsp;000&nbsp;₽</p>
//         <p class="product-address">м.&nbsp;Купчино, улица Лётчика Иванова, 3</p>
//         <p class="product-date">три дня назад</p>
//       </div>
//     </article>

//     <article class="products-list-item product">
//       <picture class="product-pic">
//         <a href="#" class="product-pic-number">10</a>
//         <img src="" width="120">
//       </picture>
//       <div class="product-description">
//         <button class="product-favorite">Добавить в избранное</button>
//         <h3 class="product-title"><a href="#">Квартира на Невском</a></h3>
//         <p class="product-price">8&thinsp;000&thinsp;000&nbsp;₽</p>
//         <p class="product-address">м.&nbsp;Купчино, улица Лётчика Иванова, 3</p>
//         <p class="product-date">три дня назад</p>
//       </div>
//     </article>

//     <article class="products-list-item product">
//       <picture class="product-pic">
//         <a href="#" class="product-pic-number">10</a>
//         <img src="" width="120">
//       </picture>
//       <div class="product-description">
//         <button class="product-favorite">Добавить в избранное</button>
//         <h3 class="product-title"><a href="#">Квартира на Невском</a></h3>
//         <p class="product-price">8&thinsp;000&thinsp;000&nbsp;₽</p>
//         <p class="product-address">м.&nbsp;Купчино, улица Лётчика Иванова, 3</p>
//         <p class="product-date">три дня назад</p>
//       </div>
//     </article>

//     <article class="products-list-item product">
//       <picture class="product-pic">
//         <a href="#" class="product-pic-number">10</a>
//         <img src="" width="120">
//       </picture>
//       <div class="product-description">
//         <button class="product-favorite">Добавить в избранное</button>
//         <h3 class="product-title"><a href="#">Квартира на Невском</a></h3>
//         <p class="product-price">8&thinsp;000&thinsp;000&nbsp;₽</p>
//         <p class="product-address">м.&nbsp;Купчино, улица Лётчика Иванова, 3</p>
//         <p class="product-date">три дня назад</p>
//       </div>
//     </article>`.trim();
// };
