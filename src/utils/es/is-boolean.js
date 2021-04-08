import type from "./type.js";

var isBoolean = function isBoolean(val) {
  return type(val) === 'Boolean';
};

export default isBoolean;