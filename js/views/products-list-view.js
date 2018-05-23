import AbstractView from "./abstract-view";
import {createProductsListMarkup} from "../markup/products-list-markup";
import {generateRandomIndex} from "../utils";

const TOP_LAYER_INDEX = 30;
const MIDDLE_LAYER_INDEX = 20;
const BOTTOM_LAYER_INDEX = 10;
const OPACITY_STEP = 0.1;
const CROSSFADE_TIME_STEP = 100;
const PRODUCT_IMAGE_WIDTH = 120;
const IMAGE_SWAP_DELAY = 3000;

const ProductsListView = class extends AbstractView {

  constructor(viewData) {
    super();
    this._viewData = viewData;
  }

  get template() {
    return createProductsListMarkup(this._viewData);
  }

  render() {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(this.template, `text/html`);
    const productNumberElements = doc.querySelectorAll(`.product-pic-number`);
    productNumberElements.forEach((element) => {
      element.style.zIndex = TOP_LAYER_INDEX;
    });
    return doc.body.childNodes;
  }

  changeData(viewData) {
    this._viewData = viewData;
    this._elements = this.render();
    this.stopImageSwap();
    this.startImageSwap();
  }

  getRandomProductIndex() {
    let randomProductIndex;
    do {
      randomProductIndex = generateRandomIndex(this.elements.length);
    } while (randomProductIndex === this._currentProductIndex);
    this._currentProductIndex = randomProductIndex;
    return randomProductIndex;
  }

  startImageSwap() {
    this._imageSwapTimeout = setTimeout(() => {
      const randomProductIndex = this.getRandomProductIndex();
      const targetElement = this.elements[randomProductIndex];
      const targetImage = targetElement.querySelector(`.product-pic img`);
      const productPictureUrls = this._viewData[randomProductIndex].pictures.slice();
      const currentImageIndex = productPictureUrls.indexOf(targetImage.src.replace(`http://`, `//`));
      const nextImageIndex = currentImageIndex === productPictureUrls.length - 1 ? 0 : currentImageIndex + 1;
      const nextImage = new Image();
      nextImage.width = PRODUCT_IMAGE_WIDTH;
      nextImage.addEventListener(`load`, () => {
        this.crossFadeImages(targetImage, nextImage);
        this.startImageSwap();
      });
      targetImage.insertAdjacentElement(`afterend`, nextImage);
      nextImage.src = productPictureUrls[nextImageIndex];
    }, IMAGE_SWAP_DELAY);
  }

  stopImageSwap() {
    if (this._imageSwapTimeout) {
      clearTimeout(this._imageSwapTimeout);
    }
  }

  crossFadeImages(imageFrom, imageTo) {
    imageTo.style.opacity = 0;
    imageTo.style.position = `absolute`;
    imageTo.style.zIndex = BOTTOM_LAYER_INDEX;
    imageFrom.style.opacity = 1;
    imageFrom.style.zIndex = MIDDLE_LAYER_INDEX;
    imageFrom.style.position = `absolute`;
    const crossFadeInterval = setInterval(() => {
      imageFrom.style.opacity -= OPACITY_STEP;
      imageTo.style.opacity = +imageTo.style.opacity + OPACITY_STEP;
      if (imageFrom.style.opacity === `0`) {
        clearInterval(crossFadeInterval);
        imageFrom.remove();
      }
    }, CROSSFADE_TIME_STEP);
  }

};

export default ProductsListView;
