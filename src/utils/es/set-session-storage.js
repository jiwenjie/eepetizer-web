import getSessionStorage from "./get-session-storage.js";

var setSessionStorage = function setSessionStorage(name, data) {
  var storageData = getSessionStorage(name) || {};
  sessionStorage.setItem(name, JSON.stringify(Object.assign({}, storageData, data)));
};

export default setSessionStorage;