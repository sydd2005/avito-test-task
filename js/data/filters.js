export const QUERY_PARAM_TYPE = {
  FAVORITE: `is-favorite`,
  CATEGORY: `category`,
  MAX_PRICE: `price-range`,
  SORT: `sort`,
};

export const CATEGORY = {
  ALL: `all`,
  AUTO: `auto`,
  CAMERAS: `cameras`,
  IMMOVABLE: `immovable`,
  LAPTOPS: `laptops`,
};

export const FILTER_TYPE = {
  MIN_VALUE: `min-value`,
  MIN_OF_SET: `min-of-set`,
  MULTIPLE_CHOICE: `multiple-choice`,
};

export const FILTER_HANDLER_MAP = {
  [FILTER_TYPE.MIN_VALUE]: (products, fieldName, minValue) => {
    return products.filter((product) => product[fieldName] >= minValue);
  },
  [FILTER_TYPE.MULTIPLE_CHOICE]: (products, fieldName, choices) => {
    if (!choices.length) {
      return products;
    }
    return products.filter((product) => choices.includes(product[fieldName]));
  },
};

export const SPECIFIC_CATEGORY_FILTERS = {
  [CATEGORY.AUTO]: [
    {
      title: `Минимальный год выпуска`,
      type: FILTER_TYPE.MIN_VALUE,
      fieldName: `year`,
      element: `range`,
    },
    {
      title: `Тип коробки передач`,
      type: FILTER_TYPE.MULTIPLE_CHOICE,
      fieldName: `gearbox`,
      values: [
        [`automatic`, `автоматическая`],
        [`mechanical`, `механическая`]
      ],
      element: `checkbox`,
    },
    {
      title: `Тип кузова`,
      type: FILTER_TYPE.MULTIPLE_CHOICE,
      fieldName: `body_type`,
      values: [
        [`sedan`, `седан`],
        [`wagon`, `универсал`],
        [`hatchback`, `хэтчбэк`],
        [`suv`, `внедорожник`]
      ],
      element: `checkbox`
    },
  ],
  [CATEGORY.CAMERAS]: [],
  [CATEGORY.IMMOVABLE]: [],
  [CATEGORY.LAPTOPS]: [],
};

export const SORT_TYPE = {
  POPULAR: `popular`,
  CHEAP: `cheap-first`,
  EXPENSIVE: `expensive-first`
};
