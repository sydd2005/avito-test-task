import AbstractPresenter from "./abstract-presenter";
import ProductsListView from "../views/products-list-view";

const ProductsListPresenter = class extends AbstractPresenter {

  constructor(outlet, productsData) {
    super(outlet);
    this._productsData = productsData;
    this._view = new ProductsListView(productsData);
    this.bind();
  }

  bind() {
    setTimeout(() => {
      const randomProductIndex = Math.floor(Math.random() * this._productsData.length);
      const productElements = this._view.element.querySelectorAll(`.product`);
      const targetElement = productElements[randomProductIndex];
      const targetImage = targetElement.querySelector(`.product-pic img`);
      const productImages = this._productsData[randomProductIndex].pictures.slice();
      const currentImageIndex = productImages.indexOf(targetImage.src);
      const nextImageIndex = currentImageIndex === productImages.length - 1 ? 0 : currentImageIndex + 1;
      targetImage.src = productImages[nextImageIndex];
    }, 3000);
  }

};

export default ProductsListPresenter;
