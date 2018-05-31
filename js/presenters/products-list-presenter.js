import AbstractPresenter from "./abstract-presenter";
import ProductsListView from "../views/products-list-view";
import ProductsListModel from "../models/products-list-model";
import config from "../config";
import {isEmpty, getQueryParams} from "../utils";

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
      const productId = addToFavoritesButton.dataset[`productId`];
      const favorites = JSON.parse(localStorage.getItem(config.LOCALSTORAGE_KEY)) || [];
      const productIndex = favorites.indexOf(productId);
      if (productIndex === -1) {
        favorites.push(productId);
        addToFavoritesButton.style.textShadow = `3px 0 4px red, -3px 0 4px red, 0 -3px 4px red, 0 3px 4px red`;
      } else {
        favorites.splice(productIndex, 1);
        addToFavoritesButton.style.removeProperty(`text-shadow`);
      }
      localStorage.setItem(config.LOCALSTORAGE_KEY, JSON.stringify(favorites));
      this._model.refreshFavorites();
    };

    window.addEventListener(`hashchange`, () => {
      const queryParams = getQueryParams(location.hash);
      if (!isEmpty(queryParams)) {
        this._model.query(queryParams);
      }
    });
  }

};

export default ProductsListPresenter;
