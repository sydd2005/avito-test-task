import AbstractPresenter from "./abstract-presenter";
import ProductsListView from "../views/products-list-view";
import DataAdapter from "../data/data-adapter";

const ProductsListPresenter = class extends AbstractPresenter {

  constructor(outlet, productsData) {
    super(outlet);
    this._productsData = productsData;
    this._view = new ProductsListView([]);
    this.adaptData();
  }

  bind() {
    setInterval(() => {
      const randomProductIndex = Math.floor(Math.random() * this._view.elements.length);
      const targetElement = this._view.elements[randomProductIndex];
      const targetImage = targetElement.querySelector(`.product-pic img`);
      const productImages = this._productsData[randomProductIndex].pictures.slice();
      const currentImageIndex = productImages.indexOf(targetImage.src.replace(`http://`, `//`));
      const nextImageIndex = currentImageIndex === productImages.length - 1 ? 0 : currentImageIndex + 1;
      targetImage.src = productImages[nextImageIndex];
    }, 2500);
  }

  adaptData() {
    DataAdapter.adaptForList(this._productsData)
        .then((adaptedData) => {
          this._view.onDataChange(adaptedData);
          this.show();
          this.bind();
        });
  }

};

export default ProductsListPresenter;
