import AbstractPresenter from "./abstract-presenter";
import ProductsFilterView from "../views/products-filter-view";
import {getQueryParams, isEmpty} from "../utils";
import ProductsFilterModel from "../models/products-filter-model";
import {QUERY_PARAM_TYPE} from "../data/filters";

const ProductsFilterPresenter = class extends AbstractPresenter {

  constructor(outlet, productsService) {
    super(outlet);
    this._view = new ProductsFilterView();
    this._productsService = productsService;
    this._model = new ProductsFilterModel();
    this.bind();
  }

  bind() {
    this._productsService.subscribe((products) => {
      const prices = products.reduce((acc, product) => {
        if (product.price) {
          acc.push(product.price);
        }
        return acc;
      }, []);
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        this._view.setPriceBounds(minPrice, maxPrice);
      }
      this._view.enableAllFilters();
    });

    window.addEventListener(`hashchange`, () => {
      const queryParams = getQueryParams(location.hash);
      if (!isEmpty(queryParams) && queryParams[QUERY_PARAM_TYPE.CATEGORY] !== this._model.queryParams[QUERY_PARAM_TYPE.CATEGORY]) {
        this._view.addSpecificFilters(queryParams);
      }
      this._model.queryParams = queryParams;
    });
  }

};

export default ProductsFilterPresenter;
