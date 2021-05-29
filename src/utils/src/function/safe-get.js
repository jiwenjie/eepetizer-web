import isFunction from '../test/is-function.js';

const safeGet = (object, key) => {
  if (key === 'constructor' && typeof isFunction(object[key])) {
    return;
  }

  if (key === '__proto__') {
    return;
  }

  return object[key];
};

export default safeGet;
