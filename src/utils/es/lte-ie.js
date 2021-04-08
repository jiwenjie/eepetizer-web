import getBrowserInfo from "./get-browser-info.js";

var lteIe = function lteIe(v) {
  var info = getBrowserInfo();
  return info.name === 'Internet Explorer' && info.version <= v;
};

export default lteIe;