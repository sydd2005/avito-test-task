import AbstractView from "./abstract-view";
import {createProductsFilterMarkup} from "../markup/products-filter-markup";

const ProductsFilterView = class extends AbstractView {

  get template() {
    return createProductsFilterMarkup();
  }

};

export default ProductsFilterView;
