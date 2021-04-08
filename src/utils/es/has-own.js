import isNil from "./is-nil.js";

var hasOwn = function hasOwn(obj, key) {
  return !isNil(obj) && Object.prototype.hasOwnProperty.call(obj, key);
};

export default hasOwn;