export const createProductsFilterMarkup = () => {
  return `
  <aside class="layout-sidebar">
  <form class="products-filter">
  <fieldset class="products-filter-group radiogroup products-filter-favorite">
    <input type="checkbox" name="is-favorite" id="favorite">
    <label class="radiogroup-item" for="favorite">Показывать избранные</label>
  </fieldset>

  <fieldset class="products-filter-group">
    <label for="category">Категория</label><br>

    <select name="category" id="category">
      <option value="all">Все объявления</option>
      <option value="auto">Авто</option>
      <option value="immovable">Недвижимость</option>
      <option value="laptops">Ноутбуки</option>
      <option value="cameras">Фотоаппараты</option>
    </select>
  </fieldset>

  <fieldset class="products-filter-group radiogroup">
    Сначала:

    <input type="radio" name="sort" value="popular" id="sort-popular" checked>
    <label class="radiogroup-item" for="sort-popular">популярные</label>

    <input type="radio" name="sort" value="cheap-first" id="sort-cheap">
    <label class="radiogroup-item" for="sort-cheap">дешевые</label>

    <input type="radio" name="sort" value="expensive-first" id="sort-expensive">
    <label class="radiogroup-item" for="sort-expensive">дорогие</label>
  </fieldset>

  <fieldset class="products-filter-group">
    <label for="price-range">Максимальная цена</label><br>
    <span class="price-range-min">1000</span>
    <input type="range" name="price-range" min="1000" max="5000">
    <span class="price-range-max">5000</span>
  </fieldset>

  <button class="products-filter-submit" type="submit">Показать</button>
</form>
</aside>`.trim();
};
