import AbstractView from "./abstract-view";
import {createFullAdMarkup} from "../markup/full-ad-markup";
import {addDelegatedEventListener} from "../utils";
import config from "../config";

const OVERLAY_LAYER_INDEX = 40;

const FullAdView = class extends AbstractView {

  constructor(model) {
    super();
    this._model = model;
  }

  get template() {
    return createFullAdMarkup(this._model);
  }

  render() {
    const renderResult = super.render();
    renderResult.style.zIndex = OVERLAY_LAYER_INDEX;

    const mapPlaceholder = renderResult.querySelector(`.details-address-map`);
    this.initMap(mapPlaceholder);

    return renderResult;
  }

  initMap(placeholder) {
    const centerPoint = this._model.address;
    const map = new google.maps.Map(placeholder, {
      zoom: 14,
      center: centerPoint
    });

    (() => new google.maps.Marker({position: centerPoint, map}))();

  }

  bind() {
    addDelegatedEventListener(`click`, `.details-close`, () => {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    });

    addDelegatedEventListener(`click`, `.details-address-map`, (mapElement) => {
      const lat = mapElement.dataset[`lat`];
      const lng = mapElement.dataset[`lng`];
      window.open(`${config.MAPS_URL_BASE}/${lat},${lng}`, `_blank`);
    });
  }
};

export default FullAdView;
