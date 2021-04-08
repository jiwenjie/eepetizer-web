var camelize = function camelize(string) {
  var upperCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var hyphenateReg = /-([a-z])/g;
  var val = string.replace(hyphenateReg, function (_, chr) {
    return chr.toUpperCase();
  });
  var firstCase = val.substring(0, 1);

  if (upperCase) {
    firstCase = firstCase.toUpperCase();
  } else {
    firstCase = firstCase.toLowerCase();
  }

  val = firstCase + val.substring(1);
  return val;
};

export default camelize;