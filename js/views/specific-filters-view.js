import AbstractView from "./abstract-view";
import {createSpecificFiltersMarkup} from "../markup/specific-filters-markup";

const SpecificFiltersView = class extends AbstractView {

  constructor(filterDefinitions) {
    super();
    this._filters = filterDefinitions;
  }

  get template() {
    return createSpecificFiltersMarkup(this._filters);
  }
};

export default SpecificFiltersView;
