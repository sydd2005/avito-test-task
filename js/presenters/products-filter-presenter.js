import AbstractPresenter from "./abstract-presenter";
import ProductsFilterView from "../views/products-filter-view";

const ProductsFilterPresenter = class extends AbstractPresenter {

  constructor(outlet, model) {
    super(outlet);
    this._model = model;
    this._view = new ProductsFilterView();
    this.bind();
  }

  bind() {
    this._model.onDataLoaded = () => {
      this._view.enableAllFilters();
    };
  }
};

export default ProductsFilterPresenter;
