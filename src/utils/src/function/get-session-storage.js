const getSessionStorage = name => {
  return JSON.parse(sessionStorage.getItem(name)) || {};
};

export default getSessionStorage;
