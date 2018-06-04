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

const getValueWeight = (fieldName, key) => {
  const filterValues = SPECIFIC_FILTERS.find((item) => item.fieldName === fieldName).values;
  const searchValue = filterValues.find((value) => value[0] === key);
  return filterValues.indexOf(searchValue);
};

export const FILTER_HANDLER_MAP = {
  [FILTER_TYPE.MIN_VALUE]: (products, fieldName, minValue) => {
    return products.filter((product) => product[fieldName] >= minValue);
  },
  [FILTER_TYPE.MULTIPLE_CHOICE]: (products, fieldName, choice) => {
    if (!choice.length) {
      return products;
    }
    const choices = [].concat(choice);
    return products.filter((product) => choices.includes(`` + product[fieldName]));
  },
  [FILTER_TYPE.MIN_OF_SET]: (products, fieldName, choice) => {
    if (!choice.length) {
      return products;
    }
    return products.filter((product) => getValueWeight(fieldName, product[fieldName]) >= getValueWeight(fieldName, choice));
  },
};

export const SPECIFIC_FILTERS = [
  {
    title: `Минимальный год выпуска`,
    type: FILTER_TYPE.MIN_VALUE,
    fieldName: `year`,
    element: `range`,
    category: CATEGORY.AUTO,
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
    category: CATEGORY.AUTO,
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
    element: `checkbox`,
    category: CATEGORY.AUTO,
  },
  {
    title: `Тип`,
    type: FILTER_TYPE.MULTIPLE_CHOICE,
    fieldName: `property_type`,
    values: [
      [`house`, `дом`],
      [`flat`, `квартира`],
      [`apartment`, `апартаменты`]
    ],
    element: `checkbox`,
    category: CATEGORY.IMMOVABLE,
  },
  {
    title: `Минимальная площадь`,
    type: FILTER_TYPE.MIN_VALUE,
    fieldName: `square`,
    element: `range`,
    category: CATEGORY.IMMOVABLE,
  },
  {
    title: `Количество комнат`,
    type: FILTER_TYPE.MULTIPLE_CHOICE,
    fieldName: `rooms`,
    values: [
      [1, `1`],
      [2, `2`],
      [3, `3`],
      [4, `4`],
    ],
    element: `checkbox`,
    category: CATEGORY.IMMOVABLE,
  },
  {
    title: `Тип`,
    type: FILTER_TYPE.MULTIPLE_CHOICE,
    fieldName: `camera_type`,
    values: [
      [`slr`, `зеркальный`],
      [`digital`, `цифровой`]
    ],
    element: `checkbox`,
    category: CATEGORY.CAMERAS,
  },
  {
    title: `Минимальное разрешение матрицы в мегапикселях`,
    type: FILTER_TYPE.MIN_VALUE,
    fieldName: `matrix_resolution`,
    element: `range`,
    category: CATEGORY.CAMERAS,
  },
  {
    title: `Минимальное разрешение видео`,
    type: FILTER_TYPE.MIN_OF_SET,
    fieldName: `video_resolution`,
    values: [
      [`HD`, `HD`],
      [`Full HD`, `Full HD`],
      [`4K`, `4K`],
      [`5K`, `5K`]
    ],
    element: `radio`,
    category: CATEGORY.CAMERAS,
  },
  {
    title: `Тип`,
    type: FILTER_TYPE.MULTIPLE_CHOICE,
    fieldName: `laptop_type`,
    values: [
      [`professional`, `ультрабук`],
      [`home`, `домашний`],
      [`game`, `игровой`],
    ],
    element: `checkbox`,
    category: CATEGORY.LAPTOPS,
  },
  {
    title: `Минимальный объем оперативной памяти`,
    type: FILTER_TYPE.MIN_OF_SET,
    fieldName: `ram`,
    values: [
      [`4`, `4 ГБ`],
      [`8`, `8 ГБ`],
      [`16`, `16 ГБ`]
    ],
    element: `radio`,
    category: CATEGORY.LAPTOPS,
  },
  {
    title: `Минимальная диагональ экрана`,
    type: FILTER_TYPE.MIN_OF_SET,
    fieldName: `screen`,
    values: [
      [`13.3`, `13"`],
      [`14`, `14"`],
      [`15`, `15"`],
      [`17`, `17"`]
    ],
    element: `radio`,
    category: CATEGORY.LAPTOPS,
  },
  {
    title: `Тип процессора`,
    type: FILTER_TYPE.MULTIPLE_CHOICE,
    fieldName: `processor`,
    values: [
      [`i3`, `i3`],
      [`i5`, `i5`],
      [`i7`, `i7`]
    ],
    element: `checkbox`,
    category: CATEGORY.LAPTOPS,
  }
];

export const getCategoryFilters = (category) => {
  return SPECIFIC_FILTERS.reduce((acc, filter) => {
    if (filter.category === category) {
      acc.push(filter);
    }
    return acc;
  }, []);
};

export const SORT_TYPE = {
  POPULAR: `popular`,
  CHEAP: `cheap-first`,
  EXPENSIVE: `expensive-first`
};
