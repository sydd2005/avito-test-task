import AbstractView from "./abstract-view";
import {createProductsFilterMarkup} from "../markup/products-filter-markup";
import {addDelegatedEventListener} from "../utils";
import {QUERY_PARAM_TYPE, getCategoryFilters} from "../data/filters";
import serialize from "form-serialize";
import config from "../config";
import SpecificFiltersView from "./specific-filters-view";

const normalizePrice = (price) => {
  return price - price % config.PRICE_STEP + config.PRICE_STEP;
};

const ProductsFilterView = class extends AbstractView {

  constructor() {
    super();
    this.disableAllFilters();
  }

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

  disableAllFilters() {
    const formControls = this.element.querySelectorAll(`[name]`);
    for (const control of formControls) {
      control.setAttribute(`disabled`, `disabled`);
    }
  }

  disableAllFiltersExceptFavorites() {
    const formControls = this.element.querySelectorAll(`[name]:not([name=${QUERY_PARAM_TYPE.FAVORITE}])`);
    for (const control of formControls) {
      control.setAttribute(`disabled`, `disabled`);
    }
  }

  enableAllFilters() {
    const formControls = this.element.querySelectorAll(`[name]`);
    for (const control of formControls) {
      control.removeAttribute(`disabled`);
    }
  }

  setPriceBounds(minPrice, maxPrice) {
    const minPriceSpan = this.element.querySelector(`.price-range-min`);
    const maxPriceSpan = this.element.querySelector(`.price-range-max`);
    const priceRangeInput = this.element.querySelector(`[name=price-range]`);
    const normalizedMinPrice = normalizePrice(minPrice);
    const normalizedMaxPrice = normalizePrice(maxPrice);
    minPriceSpan.innerText = normalizedMinPrice;
    maxPriceSpan.innerText = normalizedMaxPrice;
    priceRangeInput.min = normalizedMinPrice;
    priceRangeInput.max = normalizedMaxPrice;
    priceRangeInput.value = normalizedMaxPrice;
    priceRangeInput.step = config.PRICE_STEP;
  }

  modifyBounds(valueBoundsMap) {
    console.log(JSON.stringify(valueBoundsMap));
    const fieldNames = Object.keys(valueBoundsMap);
    fieldNames.forEach((fieldName) => {
      const rangeInput = this.element.querySelector(`[name=${fieldName}]`);
      if (rangeInput) {
        const minValueSpan = this.element.querySelector(`.${fieldName}-range-min`);
        const maxValueSpan = this.element.querySelector(`.${fieldName}-range-max`);
        const rangeMin = valueBoundsMap[fieldName].min;
        const rangeMax = valueBoundsMap[fieldName].max;
        minValueSpan.innerText = rangeMin;
        maxValueSpan.innerText = rangeMax;
        rangeInput.min = rangeMin;
        rangeInput.max = rangeMax;
        rangeInput.value = rangeMin;
      }
    });
  }

  removeSpecificFilters() {
    const specificFilters = this.element.querySelectorAll(`.specific-filters`);
    for (const filter of specificFilters) {
      filter.parentNode.removeChild(filter);
    }
  }

  addSpecificFilters(queryParams) {
    const categoryElement = this.element.querySelector(`#category`);
    const productCategory = queryParams[QUERY_PARAM_TYPE.CATEGORY];
    this.removeSpecificFilters();
    const filterDefinitions = getCategoryFilters(productCategory);
    categoryElement.insertAdjacentElement(`afterend`, (new SpecificFiltersView(filterDefinitions)).element);
  }

};

export default ProductsFilterView;
