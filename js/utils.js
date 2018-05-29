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

export const getQueryParams = (queryString) => {
  if (!queryString) {
    return {};
  }

  return (/^[?#]/.test(queryString) ? queryString.slice(1) : queryString)
      .split(`&`)
      .reduce((params, param) => {
        let [key, value] = param.split(`=`);
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ` `)) : ``;
        return params;
      }, {});
};
