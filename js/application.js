import ProductsListPresenter from "./presenters/products-list-presenter";
import ProductsFilterPresenter from "./presenters/products-filter-presenter";
import DataLoader from "./data/data-loader";
import ProductsFilterModel from "./models/products-filter-model";

const productsListOutlet = document.querySelector(`.products-list`);
const productsFilterOutlet = document.querySelector(`.layout-sidebar`);

const Application = class {

  static async start() {
    const productsFilterModel = new ProductsFilterModel();
    const productsFilterPresenter = new ProductsFilterPresenter(productsFilterOutlet, productsFilterModel);
    const productsData = await DataLoader.load();
    const productListPresenter = new ProductsListPresenter(productsListOutlet, productsData);
    productsFilterPresenter.show();
    productsFilterModel.onDataLoaded();
    productListPresenter.show();
  }

};

export default Application;
