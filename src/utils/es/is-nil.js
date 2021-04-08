import isUndefined from "./is-undefined.js";
import isNull from "./is-null.js";

var isNil = function isNil(val) {
  return isUndefined(val) || isNull(val);
};

export default isNil;