import {cloneObject} from '../utils';
import CoordinatesConverter from './coordinates-converter';

const removeDoublePictures = (pictures) => {
  return pictures.reduce((acc, cur) => {
    if (acc.indexOf(cur) === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

const DataAdapter = class {

  static async adaptForList(productsData) {
    let adaptedData = cloneObject(productsData);
    adaptedData = Promise.all(adaptedData.slice(0, 5).map(async (product) => {
      product.shortAddress = await CoordinatesConverter.toShortAddress(product.address.lat, product.address.lng);
      product.pictures = removeDoublePictures(product.pictures);
      return product;
    }));
    return adaptedData;
  }

};

export default DataAdapter;
