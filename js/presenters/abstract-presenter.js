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
    this._outlet.innerHTML = ``;
    const childElement = document.createElement(`div`);
    this._outlet.appendChild(childElement);
    childElement.replaceWith(...this._view.elements);
    this._view.elements = this._outlet.childNodes;
  }

};

export default AbstractPresenter;
