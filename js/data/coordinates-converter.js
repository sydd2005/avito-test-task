import DataLoader from "./data-loader";
import config from "../config";

const CITY_TYPE = `locality`;
const STREET_TYPE = `route`;
const GEOCODE_LANGUAGE = `ru`;
const GEOCODE_FILTER = `street_address|locality`;

const findLongName = (addressComponents, desiredType) => {
  let searchResult = addressComponents.find((component) => component.types.includes(desiredType));
  return searchResult ? searchResult.long_name : null;
};

const CoordinatesConverter = class {

  static async toShortAddress(lat, lng) {
    const geocodeUrl = `${config.GEOCODE_URL_BASE}?latlng=${lat},${lng}&key=${config.GEOCODE_KEY}&language=${GEOCODE_LANGUAGE}&result_type=${GEOCODE_FILTER}`;
    const geocodeResponse = await DataLoader.loadJson(geocodeUrl);
    const cityName = findLongName(geocodeResponse.results[0].address_components, CITY_TYPE);
    const streetName = findLongName(geocodeResponse.results[0].address_components, STREET_TYPE);
    return Promise.resolve([cityName, streetName].filter((item) => item).join(`, `));
  }

};

export default CoordinatesConverter;
