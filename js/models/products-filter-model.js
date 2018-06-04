const ProductsFilterModel = class {

  constructor() {
    this.queryParams = {};
  }

  get valueBoundsMap() {
    return this._valueBoundsMap || {};
  }

  set valueBoundsMap(value) {
    this._valueBoundsMap = value;
    this.onValueBoundsChanged(value);
  }

  onValueBoundsChanged() {}

};

export default ProductsFilterModel;
