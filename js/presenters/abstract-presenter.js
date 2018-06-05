const AbstractPresenter = class {

  constructor(outlet) {
    this._outlet = outlet;
  }

  get model() {
    return this._model;
  }

  get view() {
    return this._view;
  }

  show() {
    this._outlet.replaceWith(this._view.element);
    this._outlet = this._view.element;
  }

};

export default AbstractPresenter;
