import getSessionStorage from '../function/get-session-storage.js';

const setSessionStorage = (name, data) => {
  const storageData = getSessionStorage(name) || {};
  sessionStorage.setItem(
    name,
    JSON.stringify(Object.assign({}, storageData, data))
  );
};

export default setSessionStorage;
