import type from "./type.js";

var isFunction = function isFunction(val) {
  return type(val) === 'Function';
};

export default isFunction;