import ProductsListPresenter from "./presenters/products-list-presenter";
import ProductsFilterPresenter from "./presenters/products-filter-presenter";
import ProductsService from "./services/products-service";

const productsListOutlet = document.querySelector(`.products-list`);
const productsFilterOutlet = document.querySelector(`.layout-sidebar`);

const Application = class {

  static async start() {
    const productsService = new ProductsService();
    const productsFilterPresenter = new ProductsFilterPresenter(productsFilterOutlet, productsService);
    const productListPresenter = new ProductsListPresenter(productsListOutlet, productsService);
    productsFilterPresenter.show();
    productListPresenter.show();
    productsService.getProducts();
  }

};

export default Application;
