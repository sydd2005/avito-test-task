const AbstractView = class AbstractView {
  get template() {
    throw new Error(`Абстрактный метод должен быть переопределен в наследниках!`);
  }

  get elements() {
    if (!this._elements) {
      this._elements = this.render();
      this.bind(this._elements);
    }
    return this._elements;
  }

  set elements(nodes) {
    this._elements = nodes;
  }

  render() {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(this.template, `text/html`);
    return doc.body.childNodes;
  }

  bind() {
    // наследник может добавлять логику обработки событий
  }

};

export default AbstractView;
