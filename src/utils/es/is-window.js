import isNil from "./is-nil.js";

var isWindow = function isWindow(el) {
  return !isNil(el) ? el === el.window : false;
};

export default isWindow;