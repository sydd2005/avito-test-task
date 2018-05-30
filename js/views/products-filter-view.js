import AbstractView from "./abstract-view";
import {createProductsFilterMarkup} from "../markup/products-filter-markup";
import {addDelegatedEventListener} from "../utils";
import {QUERY_PARAM_TYPE} from "../data/filters";

const ProductsFilterView = class extends AbstractView {

  get template() {
    return createProductsFilterMarkup();
  }

  bind() {
    addDelegatedEventListener(`change`, `.products-filter`, (eventTarget) => {
      const formData = new FormData(eventTarget);
      const filterItems = [];
      if (formData.has(QUERY_PARAM_TYPE.FAVORITE)) {
        filterItems.push(`${QUERY_PARAM_TYPE.FAVORITE}=on`);
        this.disableAllFiltersExceptFavorites();
      } else {
        this.enableAllFilters();
        const filterEntries = (new FormData(eventTarget)).entries();
        for (const entry of filterEntries) {
          const key = entry[0];
          const value = entry[1];
          filterItems.push(`${key}=${value}`);
        }
      }
      location.hash = filterItems.join(`&`);
    });
  }

  disableAllFiltersExceptFavorites() {
    for (const element of this._elements) {
      const formControls = element.querySelectorAll(`[name]:not([name=${QUERY_PARAM_TYPE.FAVORITE}])`);
      for (const control of formControls) {
        control.setAttribute(`disabled`, `disabled`);
      }
    }
  }

  enableAllFilters() {
    for (const element of this._elements) {
      const formControls = element.querySelectorAll(`[name]`);
      for (const control of formControls) {
        control.removeAttribute(`disabled`);
      }
    }
  }

};

export default ProductsFilterView;
