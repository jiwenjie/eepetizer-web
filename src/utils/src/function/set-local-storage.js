import getLocalStorage from '../function/get-local-storage.js';

const setLocalStorage = (name, data) => {
  const storageData = getLocalStorage(name) || {};
  localStorage.setItem(
    name,
    JSON.stringify(Object.assign({}, storageData, data))
  );
};

export default setLocalStorage;
