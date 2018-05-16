import AbstractPresenter from "./abstract-presenter";
import ProductsFilterView from "../views/products-filter-view";

const ProductsFilterPresenter = class extends AbstractPresenter {

  constructor(outlet) {
    super(outlet);
    this._view = new ProductsFilterView();
  }
};

export default ProductsFilterPresenter;
