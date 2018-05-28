import AbstractPresenter from "./abstract-presenter";
import ProductsListView from "../views/products-list-view";
import ProductsListModel from "../models/products-list-model";
import config from "../config";

const ProductsListPresenter = class extends AbstractPresenter {

  constructor(outlet, productsData) {
    super(outlet);
    this._model = new ProductsListModel(productsData);
    this._view = new ProductsListView([]);
    this.bind();
    this._model.adaptData();
  }

  bind() {
    this._model.onDataChange = (data) => {
      this._view.changeData(data);
      this.show();
    };

    this._view.onAddToFavoritesClick = (addToFavoritesButton) => {
      addToFavoritesButton.style.textShadow = `3px 0 4px red, -3px 0 4px red, 0 -3px 4px red, 0 3px 4px red`;
      const productId = addToFavoritesButton.dataset[`productId`];
      const favorites = JSON.parse(localStorage.getItem(config.LOCALSTORAGE_KEY)) || [];
      if (favorites.indexOf(productId) === -1) {
        favorites.push(productId);
        localStorage.setItem(config.LOCALSTORAGE_KEY, JSON.stringify(favorites));
      }
    };
  }

};

export default ProductsListPresenter;
