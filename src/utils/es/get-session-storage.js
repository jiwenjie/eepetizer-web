var getSessionStorage = function getSessionStorage(name) {
  return JSON.parse(sessionStorage.getItem(name)) || {};
};

export default getSessionStorage;