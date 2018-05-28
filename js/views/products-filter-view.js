import AbstractView from "./abstract-view";
import {createProductsFilterMarkup} from "../markup/products-filter-markup";
import {addDelegatedEventListener} from "../utils";

const ProductsFilterView = class extends AbstractView {

  get template() {
    return createProductsFilterMarkup();
  }

  bind() {
    addDelegatedEventListener(`change`, `.products-filter`, (eventTarget) => {
      history.pushState({favorites: [`3`, `4`, `5`]}, `filter-change`, `filter?favorites=3,4,5`);
    });
  }

};

export default ProductsFilterView;
