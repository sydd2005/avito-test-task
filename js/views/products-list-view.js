import AbstractView from "./abstract-view";
import {createProductsListMarkup} from "../markup/products-list-markup";
import {generateRandomIndex, addDelegatedEventListener} from "../utils";
import FullAdView from "./full-ad-view";
import FullAdModel from "../models/full-ad-model";

const TOP_LAYER_INDEX = 30;
const MIDDLE_LAYER_INDEX = 20;
const BOTTOM_LAYER_INDEX = 10;
const OPACITY_STEP = 0.1;
const CROSSFADE_TIME_STEP = 100;
const PRODUCT_IMAGE_WIDTH = 120;
const IMAGE_SWAP_DELAY = 3000;

const ProductsListView = class extends AbstractView {

  constructor() {
    super();
    this._viewData = null;
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
    return doc.body.firstChild;
  }

  changeData(viewData) {
    this._viewData = viewData;
    this._element = this.render();
    this.stopImageSwap();
    this.startImageSwap();
  }

  getRandomProductIndex() {
    let randomProductIndex;
    const productCount = this._viewData.length;
    switch (productCount) {
      case 0:
        randomProductIndex = -1;
        break;
      case 1:
        randomProductIndex = 0;
        break;
      default:
        do {
          randomProductIndex = generateRandomIndex(this._viewData.length);
        } while (randomProductIndex === this._currentProductIndex);
        break;
    }

    this._currentProductIndex = randomProductIndex;
    return randomProductIndex;
  }

  startImageSwap() {
    const currentSwapTimeout = setTimeout(() => {
      const randomProductIndex = this.getRandomProductIndex();
      if (randomProductIndex >= 0) {
        const targetElement = this.element.querySelectorAll(`.product`)[randomProductIndex];
        const imagesContainer = targetElement.querySelector(`.product-pic`);
        const targetImage = targetElement.querySelector(`.product-pic img`);
        const productPictureUrls = this._viewData[randomProductIndex].pictures.slice();
        const currentImageIndex = productPictureUrls.indexOf(targetImage.src.replace(`http://`, `//`));
        const nextImageIndex = currentImageIndex === productPictureUrls.length - 1 ? 0 : currentImageIndex + 1;
        const nextImage = new Image();
        nextImage.width = PRODUCT_IMAGE_WIDTH;
        nextImage.addEventListener(`load`, () => {
          this.crossFadeImages(imagesContainer, targetImage, nextImage)
              .then(() => {
                if (currentSwapTimeout === this._imageSwapTimeout) {
                  this.startImageSwap();
                }
              });
        });
        imagesContainer.appendChild(nextImage);
        nextImage.src = productPictureUrls[nextImageIndex];
      }
    }, IMAGE_SWAP_DELAY);
    this._imageSwapTimeout = currentSwapTimeout;
  }

  stopImageSwap() {
    if (this._imageSwapTimeout) {
      clearTimeout(this._imageSwapTimeout);
    }
  }

  crossFadeImages(imageContainer, currentImage, nextImage) {
    let nextImageOpacity = 0;
    nextImage.style.opacity = nextImageOpacity;
    nextImage.style.position = `absolute`;
    nextImage.style.zIndex = BOTTOM_LAYER_INDEX;
    currentImage.style.opacity = 1;
    currentImage.style.zIndex = MIDDLE_LAYER_INDEX;
    currentImage.style.position = `absolute`;
    let crossFadeInterval;
    return new Promise((resolve) => {
      const doCrossFadeIteration = () => {
        if (nextImageOpacity < 1) {
          nextImageOpacity = +(nextImageOpacity + OPACITY_STEP).toFixed(1);
          nextImage.style.opacity = nextImageOpacity;
          currentImage.style.opacity = 1 - nextImageOpacity;
        } else {
          if (crossFadeInterval) {
            clearInterval(crossFadeInterval);
          }
          imageContainer.removeChild(currentImage);
          resolve();
        }
      };
      crossFadeInterval = setInterval(doCrossFadeIteration, CROSSFADE_TIME_STEP);
    });
  }

  showFullAdModal(model) {
    const fullAdModal = new FullAdView(model);
    this.element.appendChild(fullAdModal.element);
  }

  bind() {
    addDelegatedEventListener(`click`, `.product-favorite`, (eventTarget) => {
      this.onAddToFavoritesClick(eventTarget);
    });

    addDelegatedEventListener(`click`, `.product-title a`, async (eventTarget, event) => {
      event.preventDefault();
      const productId = eventTarget.dataset[`productId`];
      const fullAdModel = new FullAdModel(productId);
      await fullAdModel.update();
      this.showFullAdModal(fullAdModel);
    });
  }

  onAddToFavoritesClick() {}

};

export default ProductsListView;
