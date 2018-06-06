import config from "../config";

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const DataLoader = class {

  static async loadJson(url) {
    try {
      const response = await window.fetch(url);
      const checkedResponse = await checkStatus(response);
      return checkedResponse.json();
    } catch (error) {
      return Promise.reject(`Произошла ошибка в DataLoader.loadJson(): ${error}`);
    }
  }

  static async load(url) {
    try {
      const jsonResponse = await this.loadJson(url);
      return Promise.resolve(jsonResponse.data);
    } catch (error) {
      return Promise.reject(`Произошла ошибка в DataLoader.load(): ${error}`);
    }
  }

};

export default DataLoader;
