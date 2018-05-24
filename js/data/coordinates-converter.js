import DataLoader from "./data-loader";
import config from "../config";

const CITY_TYPE = `locality`;
const STREET_TYPE = `route`;
const GEOCODE_LANGUAGE = `ru`;
const GEOCODE_FILTER = `street_address|route|locality|political`;

const findLongName = (addressComponents, desiredType) => {
  let searchResult = addressComponents.find((component) => component.types.includes(desiredType));
  return searchResult ? searchResult.long_name : null;
};

const addressCache = new Map();

const CoordinatesConverter = class {

  static async toShortAddress(lat, lng) {
    const latLng = `${lat},${lng}`;
    let cachedResponse;
    if (addressCache.has(latLng)) {
      cachedResponse = addressCache.get(latLng);
    }
    const geocodeUrl = `${config.GEOCODE_URL_BASE}?latlng=${latLng}&key=${config.GEOCODE_KEY}&language=${GEOCODE_LANGUAGE}&result_type=${GEOCODE_FILTER}`;
    const geocodeResponse = cachedResponse ? cachedResponse : await DataLoader.loadJson(geocodeUrl);
    if (geocodeResponse.status === `OK`) {
      addressCache.set(latLng, geocodeResponse);
      const cityName = findLongName(geocodeResponse.results[0].address_components, CITY_TYPE);
      const streetName = findLongName(geocodeResponse.results[0].address_components, STREET_TYPE).replace(`Unnamed Road`, ``);
      return Promise.resolve([cityName, streetName].filter((item) => item).join(`, `));
    }
    return Promise.resolve(`Адрес неизвестен`);
  }

};

export default CoordinatesConverter;
