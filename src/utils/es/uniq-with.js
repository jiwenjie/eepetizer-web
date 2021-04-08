import includesWith from "./includes-with.js";
import isUndefined from "./is-undefined.js";

var uniqWith = function uniqWith(arr, fn) {
  var uniqLike = Array.from(new Set(arr));
  var result = [];

  if (!isUndefined(fn)) {
    uniqLike.forEach(function (item) {
      if (!includesWith(result, item, fn)) {
        result.push(item);
      }
    });
  } else {
    result = uniqLike;
  }

  return result;
};

export default uniqWith;