const AbstractView = class AbstractView {
  get template() {
    throw new Error(`Абстрактный метод должен быть переопределен в наследниках!`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(this._element);
    }
    return this._element;
  }

  set element(node) {
    this._element = node;
  }

  render() {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(this.template, `text/html`);
    return doc.body.firstChild;
  }

  bind() {
    // наследник может добавлять логику обработки событий
  }

};

export default AbstractView;
