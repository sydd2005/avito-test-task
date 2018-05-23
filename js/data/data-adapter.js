import {cloneObject} from '../utils';
import CoordinatesConverter from './coordinates-converter';

const PRICE_BREAK_LIMIT = 5;
const DIGIT_GROUP_SIZE = 3;
const formatOptions = {style: `currency`, currency: `RUB`, maximumFractionDigits: 0, minimumFractionDigits: 0};
const priceFormat = new Intl.NumberFormat(`ru-RU`, formatOptions);

const removeDoublePictures = (pictures) => {
  return pictures.reduce((acc, cur) => {
    if (acc.indexOf(cur) === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

const formatPrice = (price) => {
  if (!price) {
    return `Цена не указана`;
  }
  let priceString = price.toString(10);
  if (priceString.length > PRICE_BREAK_LIMIT) {
    // let digitGroups = [];
    // let currentDigitGroup;
    // while (priceString) {
    //   currentDigitGroup = priceString.slice(-DIGIT_GROUP_SIZE);
    //   priceString = priceString.slice(0, priceString.length - DIGIT_GROUP_SIZE);
    //   digitGroups.unshift(currentDigitGroup);
    // }
    // return `${digitGroups.join(`&thinsp;`)}&nbsp;₽`;
    priceString = priceFormat.format(price);
    priceString = priceString.replace(/\u00a0/g, `\u2009`).replace(`\u2009₽`, `\u00a0₽`);
    return priceString;
  }
  return `${price}&nbsp;₽`;
};

const DataAdapter = class {

  static async adaptForList(productsData) {
    let adaptedData = cloneObject(productsData);
    adaptedData = Promise.all(adaptedData.slice(0, 5).map(async (product) => {
      product.shortAddress = await CoordinatesConverter.toShortAddress(product.address.lat, product.address.lng);
      product.pictures = removeDoublePictures(product.pictures);
      product.price = formatPrice(product.price);
      return product;
    }));
    return adaptedData;
  }

};

export default DataAdapter;
