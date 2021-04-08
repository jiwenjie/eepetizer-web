var getLocalStorage = function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name)) || {};
};

export default getLocalStorage;