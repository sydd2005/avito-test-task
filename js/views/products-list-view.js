import AbstractView from "./abstract-view";
import {createProductsListMarkup} from "../markup/products-list-markup";

const ProductsListView = class extends AbstractView {

  constructor(productsList) {
    super();
    this._model = productsList;
  }

  get template() {
    return createProductsListMarkup(this._model);
  }

};

export default ProductsListView;
