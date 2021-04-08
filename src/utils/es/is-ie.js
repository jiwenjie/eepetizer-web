import getBrowserInfo from "./get-browser-info.js";
import isUndefined from "./is-undefined.js";

var isIe = function isIe(v) {
  var browserInfo = getBrowserInfo();
  var isIeVal = browserInfo.name === 'Internet Explorer';

  if (isUndefined(v)) {
    return isIeVal;
  } else {
    return isIeVal && browserInfo.version === v;
  }
};

export default isIe;