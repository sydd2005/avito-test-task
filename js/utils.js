export const cloneObject = (sourceObject) => {
  return JSON.parse(JSON.stringify(sourceObject));
};

export const generateRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};
