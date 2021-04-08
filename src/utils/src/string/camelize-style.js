import camelize from '../string/camelize.js';

const camelizeStyle = (string, upperCase) => {
  const prefixReg = /^-(ms|webkit)-/;
  return camelize(
    prefixReg.test(string) ? string.substring(1, string.length) : string,
    upperCase
  );
};

export default camelizeStyle;
