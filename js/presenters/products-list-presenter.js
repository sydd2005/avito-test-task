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
    setInterval(() => {
      const randomProductIndex = Math.floor(Math.random() * this._productsData.length);
      const targetElement = this._view.elements[randomProductIndex];
      const targetImage = targetElement.querySelector(`.product-pic img`);
      const productImages = this._productsData[randomProductIndex].pictures.slice();
      // const distinctImages = productImages.reduce((acc, cur) => {
      //   if (acc.indexOf(cur) === -1) {
      //     acc.push(cur);
      //   }
      //   return acc;
      // }, []);
      const currentImageIndex = productImages.indexOf(targetImage.src.replace(`http://`, `//`));
      const nextImageIndex = currentImageIndex === productImages.length - 1 ? 0 : currentImageIndex + 1;
      targetImage.src = productImages[nextImageIndex];
    }, 2500);
  }

};

export default ProductsListPresenter;
