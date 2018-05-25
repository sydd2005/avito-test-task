import DataLoader from "./data-loader";
import config from "../config";

const ADDRESS_TYPE = {
  STREET_ADDRESS: `street_address`,
  ROUTE: `route`,
  LOCALITY: `locality`,
  POLITICAL: `political`
};

const GEOCODE_LANGUAGE = `ru`;
const GEOCODE_FILTER = `street_address|route|locality|political`;

const findLongName = (geocodeResults, desiredType) => {
  const searchResult = geocodeResults.find((result) => {
    return result.types.includes(ADDRESS_TYPE.STREET_ADDRESS) || result.types.includes(desiredType) || result.types.includes(ADDRESS_TYPE.POLITICAL);
  });
  let addressComponent;
  if (searchResult) {
    addressComponent = searchResult.address_components.find((component) => component.types.includes(desiredType));
    addressComponent = addressComponent || searchResult.address_components.find((component) => component.types.includes(ADDRESS_TYPE.POLITICAL));
  }
  return addressComponent ? addressComponent.long_name : ``;
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
      const cityName = findLongName(geocodeResponse.results, ADDRESS_TYPE.LOCALITY);
      const streetName = findLongName(geocodeResponse.results, ADDRESS_TYPE.ROUTE).replace(`Unnamed Road`, ``);
      const shortAddress = [cityName, streetName].filter((item) => item).join(`, `);
      return Promise.resolve(shortAddress || latLng);
    }
    return Promise.resolve(`Адрес неизвестен`);
  }

};

export default CoordinatesConverter;
