import getLocalStorage from "./get-local-storage.js";

var setLocalStorage = function setLocalStorage(name, data) {
  var storageData = getLocalStorage(name) || {};
  localStorage.setItem(name, JSON.stringify(Object.assign({}, storageData, data)));
};

export default setLocalStorage;