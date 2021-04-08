const hyphenate = (string, upperCase = false) => {
  let val = string.replace(/([A-Z])/g, '-$1').toLowerCase();
  if (upperCase) {
    val = val.substring(1, val.length);
  }
  return val;
};

export default hyphenate;
