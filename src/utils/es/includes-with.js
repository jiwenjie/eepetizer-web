import isNumber from "./is-number.js";
import isFunction from "./is-function.js";

var includesWith = function includesWith(arr, item, fromIndex, comparator) {
  var length = arr.length;
  var startIndex = -1;

  var compare = function compare(a, b) {
    return a === b;
  };

  if (isFunction(fromIndex)) {
    compare = fromIndex;
  } else if (isNumber(fromIndex)) {
    startIndex = Math.max(fromIndex + length, 0);
    compare = comparator || compare;
  }

  while (++startIndex < length) {
    if (compare(item, arr[startIndex])) {
      return true;
    }
  }

  return false;
};

export default includesWith;