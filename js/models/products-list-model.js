import {cloneObject} from "../utils";
import {SORT_TYPE, QUERY_PARAM_TYPE, CATEGORY, getCategoryFilters, FILTER_HANDLER_MAP} from "../data/filters";
import config from "../config";

const COMPARE_FUNCTION = {
  [SORT_TYPE.CHEAP]: (first, second) => {
    if (!first.price) {
      return 1;
    }
    if (!second.price) {
      return -1;
    }
    return first.price - second.price;
  },
  [SORT_TYPE.EXPENSIVE]: (first, second) => {
    if (!first.price) {
      return 1;
    }
    if (!second.price) {
      return -1;
    }
    return second.price - first.price;
  },
};


const ProductsListModel = class {

  constructor() {
    this._products = [];
  }

  changeData(data) {
    this._products = data;
    this.onDataChange(data);
  }

  query(queryParams) {
    let resultData = cloneObject(this._products);
    if (queryParams[QUERY_PARAM_TYPE.FAVORITE]) {
      resultData = resultData.filter((item) => item.isFavorite);
    } else {
      const categoryParam = queryParams[QUERY_PARAM_TYPE.CATEGORY];
      if (categoryParam !== CATEGORY.ALL) {
        const categoryFilters = getCategoryFilters(categoryParam);
        const specificFilters = categoryFilters.reduce((acc, filter) => {
          if (queryParams[filter.fieldName]) {
            acc.push(filter);
          }
          return acc;
        }, []);
        if (specificFilters.length) {
          for (const specificFilter of specificFilters) {
            const filterFunction = FILTER_HANDLER_MAP[specificFilter.type];
            resultData = filterFunction(resultData, specificFilter.fieldName, queryParams[specificFilter.fieldName]);
          }
        } else {
          resultData = resultData.filter((product) => product.category === categoryParam);
        }
      }

      const maxPriceParam = queryParams[QUERY_PARAM_TYPE.MAX_PRICE];
      resultData = resultData.filter((product) => !product.price || product.price <= maxPriceParam);

      const sortType = queryParams[QUERY_PARAM_TYPE.SORT];
      resultData = sortType === SORT_TYPE.POPULAR ? resultData : resultData.sort(COMPARE_FUNCTION[sortType]);
    }
    this.onDataChange(resultData);
  }

  refreshFavorites() {
    const favorites = JSON.parse(localStorage.getItem(config.LOCALSTORAGE_KEY)) || [];
    this._products.forEach((product) => {
      product.isFavorite = favorites.includes(product.id);
    });
  }

  onDataChange() {}

};

export default ProductsListModel;
