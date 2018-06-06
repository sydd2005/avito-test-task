import AbstractView from "./abstract-view";
import {createFullAdMarkup} from "../markup/full-ad-markup";
import {addDelegatedEventListener} from "../utils";

const OVERLAY_LAYER_INDEX = 40;

const FullAdView = class extends AbstractView {

  constructor(model) {
    super();
    this._model = model;
  }

  render() {
    const renderResult = super.render();
    renderResult.style.zIndex = OVERLAY_LAYER_INDEX;
    return renderResult;
  }

  get template() {
    return createFullAdMarkup(this._model);
  }

  bind() {
    addDelegatedEventListener(`click`, `.details-close`, () => {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    });
  }
};

export default FullAdView;
