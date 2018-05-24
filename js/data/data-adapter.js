import {cloneObject} from '../utils';
import CoordinatesConverter from './coordinates-converter';

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

const DataAdapter = class {

  static async adaptForList(productsData) {
    let adaptedData = cloneObject(productsData);
    adaptedData = Promise.all(adaptedData.map(async (product) => {
      product.shortAddress = await CoordinatesConverter.toShortAddress(product.address.lat, product.address.lng);
      product.pictures = removeDoublePictures(product.pictures);
      product.price = formatPrice(product.price, RUB_SYMBOL);
      return product;
    }));
    return adaptedData;
  }

};

export default DataAdapter;
