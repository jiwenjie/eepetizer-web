import camelize from "./camelize.js";

var camelizeStyle = function camelizeStyle(string, upperCase) {
  var prefixReg = /^-(ms|webkit)-/;
  return camelize(prefixReg.test(string) ? string.substring(1, string.length) : string, upperCase);
};

export default camelizeStyle;