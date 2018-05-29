import {cloneObject} from '../utils';
import CoordinatesConverter from './coordinates-converter';
import config from '../config';

const PRICE_BREAK_LIMIT = 5;
const FORMAT_OPTIONS = {style: `decimal`, maximumFractionDigits: 0, minimumFractionDigits: 0};
const NBSP_CHAR = `\u00a0`;
const THINSP_CHAR = `\u2009`;
const NBSP_REGEXP = new RegExp(NBSP_CHAR, `g`);
const RUB_SYMBOL = `₽`;

const ruNumberFormatter = new Intl.NumberFormat(`ru-RU`, FORMAT_OPTIONS);

const removeDoublePictures = (pictures) => {
  return pictures.reduce((acc, cur) => {
    if (acc.indexOf(cur) === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

const formatPrice = (price, currencySymbol) => {
  if (!price) {
    return `Цена не указана`;
  }
  let priceString = price.toString(10);
  if (priceString.length > PRICE_BREAK_LIMIT) {
    priceString = ruNumberFormatter.format(price).replace(NBSP_REGEXP, THINSP_CHAR);
  }
  return `${priceString}${NBSP_CHAR}${currencySymbol}`;
};

const mapWithDelay = async (sourceArray, delay, cb) => {
  return new Promise((resolve) => {
    let i = 0;
    const destArray = [];
    destArray.push(cb(sourceArray[i++]));

    const callbackInterval = setInterval(() => {
      if (i < sourceArray.length) {
        destArray.push(cb(sourceArray[i]));
        i++;
      } else {
        clearInterval(callbackInterval);
        resolve(destArray);
      }
    }, delay);
  });
};

let favorites = [];

const DataAdapter = class {

  static async adaptProduct(product) {
    const adaptedProduct = cloneObject(product);
    adaptedProduct.shortAddress = await CoordinatesConverter.toShortAddress(product.address.lat, product.address.lng);
    adaptedProduct.pictures = removeDoublePictures(product.pictures);
    adaptedProduct.formattedPrice = formatPrice(product.price, RUB_SYMBOL);
    adaptedProduct.isFavorite = favorites.includes(product.id);
    return adaptedProduct;
  }

  static async adaptForList(productsData) {
    favorites = JSON.parse(localStorage.getItem(config.LOCALSTORAGE_KEY)) || [];
    const adaptedData = await mapWithDelay(productsData, config.GEOCODE_CONSEQUENT_REQUEST_DELAY, this.adaptProduct);
    return Promise.all(adaptedData);
  }

};

export default DataAdapter;
