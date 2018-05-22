import DataAdapter from "../data/data-adapter";

const ProductsListModel = class {

  constructor(data) {
    this._rawData = data;
  }

  async adaptData() {
    this._adaptedData = await DataAdapter.adaptForList(this._rawData);
    this.onDataChange(this._adaptedData);
  }

  onDataChange() {}

};

export default ProductsListModel;
