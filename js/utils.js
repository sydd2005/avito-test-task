export const cloneObject = (sourceObject) => {
  return JSON.parse(JSON.stringify(sourceObject));
};

export const generateRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

export const addDelegatedEventListener = (eventType, targetSelector, eventHandler, elementToListen = document) => {
  elementToListen.addEventListener(eventType, (evt) => {
    let currentTarget = evt.target;
    while (currentTarget && currentTarget !== elementToListen) {
      if (currentTarget.matches(targetSelector)) {
        eventHandler(currentTarget);
        break;
      }
      currentTarget = currentTarget.parentNode;
    }
  });
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const getQueryParams = (queryString) => {
  if (!queryString) {
    return {};
  }

  return (/^[?#]/.test(queryString) ? queryString.slice(1) : queryString)
      .split(`&`)
      .reduce((params, param) => {
        let [key, value] = param.split(`=`);
        value = value ? decodeURIComponent(value.replace(/\+/g, ` `)) : ``;
        params[key] = params.hasOwnProperty(key) ? [value].concat(params[key]) : value;
        return params;
      }, {});
};
