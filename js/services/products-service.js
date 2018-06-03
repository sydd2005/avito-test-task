import DataLoader from "../data/data-loader";
import DataAdapter from "../data/data-adapter";

const ProductsService = class {

  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  notifyAll(message) {
    for (const listener of this.listeners) {
      listener(message);
    }
  }

  async getProducts() {
    const productsData = await DataLoader.load();
    this._adaptedData = await DataAdapter.adaptForList(productsData);
    this.notifyAll(this._adaptedData);
    return this._adaptedData;
  }

};

export default ProductsService;
