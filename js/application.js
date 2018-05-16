import ProductsListPresenter from "./presenters/products-list-presenter";
import ProductsFilterPresenter from "./presenters/products-filter-presenter";
import DataLoader from "./data/data-loader";

const productsListOutlet = document.querySelector(`.products-list`);
const productsFilterOutlet = document.querySelector(`.layout-sidebar`);

const Application = class {

  static async start() {
    const productsData = await DataLoader.load();
    const productListPresenter = new ProductsListPresenter(productsListOutlet, productsData);
    const productsFilterPresenter = new ProductsFilterPresenter(productsFilterOutlet);
    productsFilterPresenter.show();
    productListPresenter.show();
  }

};

export default Application;
