import isNumber from '../test/is-number.js';
import isFunction from '../test/is-function.js';

const includesWith = (arr, item, fromIndex, comparator) => {
  const length = arr.length;
  let startIndex = -1;
  let compare = (a, b) => a === b;
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
