import AbstractView from "./abstract-view";
import {createProductsListMarkup} from "../markup/products-list-markup";

const ProductsListView = class extends AbstractView {

  constructor(model) {
    super();
    this._model = model;
  }

  get template() {
    return createProductsListMarkup(this._model);
  }

  onDataChange(model) {
    this._model = model;
    this._elements = this.render();
  }

};

export default ProductsListView;
