import type from "./type.js";

var isRegexp = function isRegexp(val) {
  return type(val) === 'RegExp';
};

export default isRegexp;