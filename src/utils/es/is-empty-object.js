import isObject from "./is-object.js";

var isEmptyObject = function isEmptyObject(val) {
  return isObject(val) ? Object.keys(val).length === 0 : false;
};

export default isEmptyObject;