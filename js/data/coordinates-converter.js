import DataLoader from "./data-loader";
import config from "../config";

const ADDRESS_TYPE = {
  STREET_NUMBER: `street_number`,
  STREET_ADDRESS: `street_address`,
  ROUTE: `route`,
  LOCALITY: `locality`,
  COUNTRY: `country`,
  POLITICAL: `political`
};

const EXCESS_ADDRESS_INFO = `Unnamed Road`;
const UNKNOWN_ADDRESS = `Адрес неизвестен`;

const GEOCODE_LANGUAGE = `ru`;
const GEOCODE_FILTER = `street_address|route|locality|political`;
const GEOCODE_STATUS_OK = `OK`;

const findLongName = (geocodeResults, desiredType) => {
  const searchResult = geocodeResults.find((result) => {
    return result.types.includes(ADDRESS_TYPE.STREET_ADDRESS) || result.types.includes(desiredType) || result.types.includes(ADDRESS_TYPE.POLITICAL);
  });
  let addressComponent;
  if (searchResult) {
    addressComponent = searchResult.address_components.find((component) => component.types.includes(desiredType));
    if (!addressComponent && desiredType === ADDRESS_TYPE.LOCALITY) {
      addressComponent = addressComponent || searchResult.address_components.find((component) => component.types.includes(ADDRESS_TYPE.POLITICAL));
    }
  }
  return addressComponent ? addressComponent.long_name : ``;
};

const getGeocodeResponse = async (lat, lng) => {
  const latLng = `${lat},${lng}`;
  const geocodeUrl = `${config.GEOCODE_URL_BASE}?latlng=${latLng}&key=${config.MAPS_API_KEY}&language=${GEOCODE_LANGUAGE}&result_type=${GEOCODE_FILTER}`;
  return DataLoader.loadJson(geocodeUrl);
};

const getGeolocationCountry = async () => {
  const geolocationUrl = `${config.GEOLOCATION_URL_BASE}?key=${config.GEOLOCATION_KEY}`;
  const geolocationResponse = await DataLoader.loadJson(geolocationUrl, `POST`);
  if (geolocationResponse.location) {
    const {lat, lng} = geolocationResponse.location;
    const geocodeResponse = await getGeocodeResponse(lat, lng);
    if (geocodeResponse.status === GEOCODE_STATUS_OK) {
      return findLongName(geocodeResponse.results, ADDRESS_TYPE.COUNTRY);
    }
  }
  return null;
};

const CoordinatesConverter = class {

  static async toShortAddress(lat, lng) {
    const geocodeResponse = await getGeocodeResponse(lat, lng);
    if (geocodeResponse.status === GEOCODE_STATUS_OK) {
      const cityName = findLongName(geocodeResponse.results, ADDRESS_TYPE.LOCALITY);
      const streetName = findLongName(geocodeResponse.results, ADDRESS_TYPE.ROUTE).replace(EXCESS_ADDRESS_INFO, ``);
      const shortAddress = [cityName, streetName].filter((item) => item).join(`, `);
      return Promise.resolve(shortAddress);
    }
    return Promise.resolve(UNKNOWN_ADDRESS);
  }

  static async toFullAddress(lat, lng) {
    return new Promise((resolve) => {
      Promise.all([
        getGeolocationCountry(),
        getGeocodeResponse(lat, lng)
      ]
      ).then(([geolocationCountry, geocodeResponse]) => {
        if (geocodeResponse.status === GEOCODE_STATUS_OK) {
          const cityName = findLongName(geocodeResponse.results, ADDRESS_TYPE.LOCALITY);
          const streetName = findLongName(geocodeResponse.results, ADDRESS_TYPE.ROUTE).replace(EXCESS_ADDRESS_INFO, ``);
          const streetNumber = findLongName(geocodeResponse.results, ADDRESS_TYPE.STREET_NUMBER);
          const adCountry = findLongName(geocodeResponse.results, ADDRESS_TYPE.COUNTRY);
          const isSameCountry = geolocationCountry === adCountry;
          const country = isSameCountry ? `` : adCountry;
          const fullAddress = [country, cityName, streetName, streetNumber].filter((item) => item).join(`, `);
          resolve(fullAddress);
        }
        resolve(UNKNOWN_ADDRESS);
      });
    });
  }

};

export default CoordinatesConverter;
