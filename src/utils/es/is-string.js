import type from "./type.js";

var isString = function isString(val) {
  return type(val) === 'String';
};

export default isString;