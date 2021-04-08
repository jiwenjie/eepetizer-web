import hyphenate from "./hyphenate.js";

var hyphenateStyle = function hyphenateStyle(string, upperCase) {
  var prefixReg = /^(ms|webkit)-/;
  string = hyphenate(string, upperCase);
  return prefixReg.test(string) ? "-".concat(string) : string;
};

export default hyphenateStyle;