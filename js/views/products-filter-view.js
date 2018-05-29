import AbstractView from "./abstract-view";
import {createProductsFilterMarkup} from "../markup/products-filter-markup";
import {addDelegatedEventListener} from "../utils";

const ProductsFilterView = class extends AbstractView {

  get template() {
    return createProductsFilterMarkup();
  }

  bind() {
    addDelegatedEventListener(`change`, `.products-filter`, (eventTarget) => {
      // history.pushState({favorites: [`3`, `4`, `5`]}, `filter-change`, `?favorites=3,4,5`);
      const filterEntries = (new FormData(eventTarget)).entries();
      const filterItems = [];
      for (const entry of filterEntries) {
        filterItems.push(`${entry[0]}=${entry[1]}`);
      }
      location.hash = filterItems.join(`&`);
    });
  }

};

export default ProductsFilterView;
