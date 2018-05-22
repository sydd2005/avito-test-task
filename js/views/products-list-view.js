import AbstractView from "./abstract-view";
import {createProductsListMarkup} from "../markup/products-list-markup";
import {generateRandomIndex} from "../utils";

const ProductsListView = class extends AbstractView {

  constructor(viewData) {
    super();
    this._viewData = viewData;
  }

  get template() {
    return createProductsListMarkup(this._viewData);
  }

  changeData(viewData) {
    this._viewData = viewData;
    this._elements = this.render();
    this.stopImageSwap();
    this.startImageSwap();
  }

  startImageSwap() {
    this._imageSwapTimeout = setTimeout(() => {
      const randomProductIndex = generateRandomIndex(this.elements.length);
      const targetElement = this.elements[randomProductIndex];
      const targetImage = targetElement.querySelector(`.product-pic img`);
      const productNumberElement = targetElement.querySelector(`.product-pic-number`);
      productNumberElement.style.zIndex = 30;
      const productPictureUrls = this._viewData[randomProductIndex].pictures.slice();
      const currentImageIndex = productPictureUrls.indexOf(targetImage.src.replace(`http://`, `//`));
      const nextImageIndex = currentImageIndex === productPictureUrls.length - 1 ? 0 : currentImageIndex + 1;
      const nextImage = new Image();
      nextImage.width = 120;
      nextImage.addEventListener(`load`, () => {
        this.crossFadeImages(targetImage, nextImage);
        this.startImageSwap();
      });
      targetImage.insertAdjacentElement(`afterend`, nextImage);
      nextImage.src = productPictureUrls[nextImageIndex];
    }, 2500);
  }

  stopImageSwap() {
    if (this._imageSwapTimeout) {
      clearTimeout(this._imageSwapTimeout);
    }
  }

  crossFadeImages(imageFrom, imageTo) {
    imageTo.style.opacity = 0;
    imageTo.style.position = `absolute`;
    imageTo.style.zIndex = 10;
    imageFrom.style.opacity = 1;
    imageFrom.style.zIndex = 20;
    imageFrom.style.position = `absolute`;
    const crossFadeInterval = setInterval(() => {
      imageFrom.style.opacity -= 0.1;
      imageTo.style.opacity = +imageTo.style.opacity + 0.1;
      if (imageFrom.style.opacity === `0`) {
        clearInterval(crossFadeInterval);
        imageFrom.remove();
      }
    }, 100);
  }

};

export default ProductsListView;
