import type from "./type.js";

var isArray = function isArray(val) {
  return type(val) === 'Array';
};

export default isArray;