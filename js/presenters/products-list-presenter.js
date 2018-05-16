import AbstractPresenter from "./abstract-presenter";
import ProductsListView from "../views/products-list-view";

const ProductsListPresenter = class extends AbstractPresenter {

  constructor(outlet, productsData) {
    super(outlet);
    this._view = new ProductsListView(productsData);
  }

};

export default ProductsListPresenter;
