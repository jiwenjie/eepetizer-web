const camelize = (string, upperCase = false) => {
  const hyphenateReg = /-([a-z])/g;
  let val = string.replace(hyphenateReg, (_, chr) => chr.toUpperCase());
  let firstCase = val.substring(0, 1);
  if (upperCase) {
    firstCase = firstCase.toUpperCase();
  } else {
    firstCase = firstCase.toLowerCase();
  }
  val = firstCase + val.substring(1);
  return val;
};

export default camelize;
