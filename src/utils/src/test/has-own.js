import isNil from '../test/is-nil.js';

const hasOwn = (obj, key) => {
  return !isNil(obj) && Object.prototype.hasOwnProperty.call(obj, key);
};

export default hasOwn;
