import AbstractPresenter from "./abstract-presenter";
import ProductsFilterView from "../views/products-filter-view";
import {getQueryParams, isEmpty} from "../utils";
import ProductsFilterModel from "../models/products-filter-model";
import {QUERY_PARAM_TYPE, SPECIFIC_FILTERS, FILTER_TYPE} from "../data/filters";

const getValueBoundsMap = (products) => {
  const valueBoundsMap = {};
  const minValueFiltersFieldNames = SPECIFIC_FILTERS.filter((filter) => filter.type === FILTER_TYPE.MIN_VALUE).map((filter) => filter.fieldName);
  minValueFiltersFieldNames.forEach((fieldName) => (valueBoundsMap[fieldName] = {}));
  products.forEach((product) => {
    minValueFiltersFieldNames.forEach((fieldName) => {
      if (product[fieldName]) {
        valueBoundsMap[fieldName].min = valueBoundsMap[fieldName].min ? Math.min(valueBoundsMap[fieldName].min, product[fieldName]) : product[fieldName];
        valueBoundsMap[fieldName].max = valueBoundsMap[fieldName].max ? Math.max(valueBoundsMap[fieldName].max, product[fieldName]) : product[fieldName];
      }
    });
  });
  return valueBoundsMap;
};

const ProductsFilterPresenter = class extends AbstractPresenter {

  constructor(outlet, productsService) {
    super(outlet);
    this._view = new ProductsFilterView();
    this._model = new ProductsFilterModel();
    this._productsService = productsService;
    this.bind();
  }

  bind() {
    this._productsService.subscribe((products) => {
      this._model.valueBoundsMap = getValueBoundsMap(products);
      const prices = products.map((product) => product.price).filter((price) => price);
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        this._view.setPriceBounds(minPrice, maxPrice);
      }
      this._view.enableAllFilters();
    });

    this._model.onValueBoundsChanged = (valueBoundsMap) => {
      this._view.modifyBounds(valueBoundsMap);
    };

    window.addEventListener(`hashchange`, () => {
      const queryParams = getQueryParams(location.hash);
      if (!isEmpty(queryParams) && queryParams[QUERY_PARAM_TYPE.CATEGORY] !== this._model.queryParams[QUERY_PARAM_TYPE.CATEGORY]) {
        this._view.addSpecificFilters(queryParams);
      }
      this._model.queryParams = queryParams;
      this._view.modifyBounds(this._model.valueBoundsMap);
    });
  }

};

export default ProductsFilterPresenter;
