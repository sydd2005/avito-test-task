import DataLoader from "../data/data-loader";
import config from "../config";
import DataAdapter from "../data/data-adapter";

const FullAdModel = class {

  constructor(productId) {
    this._productId = productId;
  }

  async update() {
    const fullProduct = await DataLoader.load(`${config.PRODUCTS_URL}/${this._productId}`);
    const {fullAddress, pictures, formattedPrice} = await DataAdapter.adaptFullProduct(fullProduct);
    this.title = fullProduct.title;
    this.fullAddress = fullAddress;
    this.pictures = pictures;
    this.formattedPrice = formattedPrice;
  }

};

export default FullAdModel;
