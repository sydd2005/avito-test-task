const createSpecificFilterMarkup = (filterDefinition) => {
  const titleMarkup = `<label>${filterDefinition.title}</label><br>`;
  let filterMarkup = ``;
  if (!filterDefinition.values) {
    filterMarkup = `
    <span class="price-range-min ${filterDefinition.fieldName}-range-min">0</span>
    <input type="${filterDefinition.element}" name="${filterDefinition.fieldName}">
    <span class="price-range-max ${filterDefinition.fieldName}-range-max">100</span>
    `;
  } else {
    filterDefinition.values.forEach((value) => {
      filterMarkup += `
      <input type="${filterDefinition.element}" name="${filterDefinition.fieldName}" value="${value[0]}">
      <label>${value[1]}</label>`.trim();
    });
  }
  return `
  <div>
    ${titleMarkup + filterMarkup}
  </div>`.trim();
};

export const createSpecificFiltersMarkup = (filterDefinitions) => {
  let filtersMarkup = ``;
  filterDefinitions.forEach((definition) => (filtersMarkup += createSpecificFilterMarkup(definition)));
  return `
  <div class="specific-filters">
    ${filtersMarkup}
  </div>`.trim();
};
