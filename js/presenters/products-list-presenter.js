import AbstractPresenter from "./abstract-presenter";
import ProductsListView from "../views/products-list-view";
import ProductsListModel from "../models/products-list-model";

const ProductsListPresenter = class extends AbstractPresenter {

  constructor(outlet, productsData) {
    super(outlet);
    this._model = new ProductsListModel(productsData);
    this._view = new ProductsListView([]);
    this.bind();
  }

  bind() {
    this._model.onDataChange = (data) => {
      this._view.changeData(data);
      this.show();
    };

    this._model.adaptData();
  }

};

export default ProductsListPresenter;
