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

// function* createGenerator(array) {
//   for (const item of array) {
//     yield item;
//   }
// }

const mapWithDelay = async (sourceArray, delay, cb) => {
  // const generator = createGenerator(sourceArray);
  let i = 0;
  const mapResult = [];
  return new Promise((resolve) => {
    // let item = generator.next();
    mapResult.push(cb(sourceArray[i++]));

    const callbackInterval = setInterval(() => {
      // item = generator.next();
      if (i < sourceArray.length) {
        mapResult.push(cb(sourceArray[i]));
        i++;
      } else {
        clearInterval(callbackInterval);
        resolve(mapResult);
      }
    }, delay);
  });
};

const DataAdapter = class {

  static async adaptProduct(product) {
    const adaptedProduct = cloneObject(product);
    adaptedProduct.shortAddress = await CoordinatesConverter.toShortAddress(product.address.lat, product.address.lng);
    console.log(adaptedProduct.shortAddress);
    adaptedProduct.pictures = removeDoublePictures(product.pictures);
    adaptedProduct.price = formatPrice(product.price, RUB_SYMBOL);
    return adaptedProduct;
  }

  static async adaptForList(productsData) {
    const adaptedData = await mapWithDelay(productsData, config.GEOCODE_CONSEQUENT_REQUEST_DELAY, this.adaptProduct);
    return Promise.all(adaptedData);
  }

};

export default DataAdapter;
