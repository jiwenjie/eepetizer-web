var hyphenate = function hyphenate(string) {
  var upperCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var val = string.replace(/([A-Z])/g, '-$1').toLowerCase();

  if (upperCase) {
    val = val.substring(1, val.length);
  }

  return val;
};

export default hyphenate;