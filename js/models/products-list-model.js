import DataAdapter from "../data/data-adapter";
import {cloneObject} from "../utils";
import {SORT_TYPE, QUERY_PARAM_TYPE, CATEGORY} from "../data/filters";

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

  constructor(data) {
    this._rawData = data;
  }

  async adaptData() {
    this._adaptedData = await DataAdapter.adaptForList(this._rawData);
    this.onDataChange(this._adaptedData);
  }

  query(queryParams) {
    let resultData = cloneObject(this._adaptedData);
    if (queryParams[QUERY_PARAM_TYPE.FAVORITE]) {
      resultData = resultData.filter((item) => item.isFavorite);
    } else {
      resultData = queryParams[QUERY_PARAM_TYPE.CATEGORY] === CATEGORY.ALL ? resultData : resultData.filter((item) => item.category === queryParams[QUERY_PARAM_TYPE.CATEGORY]);
      const sortType = queryParams[QUERY_PARAM_TYPE.SORT];
      resultData = sortType === SORT_TYPE.POPULAR ? resultData : resultData.sort(COMPARE_FUNCTION[sortType]);
    }
    this.onDataChange(resultData);
  }

  onDataChange() {}

};

export default ProductsListModel;
