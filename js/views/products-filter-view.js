import AbstractView from "./abstract-view";
import {createProductsFilterMarkup} from "../markup/products-filter-markup";
import {addDelegatedEventListener} from "../utils";
import {QUERY_PARAM_TYPE} from "../data/filters";
import serialize from "form-serialize";

const ProductsFilterView = class extends AbstractView {

  get template() {
    return createProductsFilterMarkup();
  }

  bind() {
    addDelegatedEventListener(`change`, `.products-filter`, (eventTarget) => {
      const formData = serialize(eventTarget, {hash: true});
      if (formData[QUERY_PARAM_TYPE.FAVORITE]) {
        this.disableAllFiltersExceptFavorites();
      } else {
        this.enableAllFilters();
      }
      location.hash = serialize(eventTarget);
    });
  }

  disableAllFiltersExceptFavorites() {
    const formControls = this._element.querySelectorAll(`[name]:not([name=${QUERY_PARAM_TYPE.FAVORITE}])`);
    for (const control of formControls) {
      control.setAttribute(`disabled`, `disabled`);
    }
  }

  enableAllFilters() {
    const formControls = this._element.querySelectorAll(`[name]`);
    for (const control of formControls) {
      control.removeAttribute(`disabled`);
    }
  }

};

export default ProductsFilterView;
