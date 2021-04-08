import type from "./type.js";

var isDate = function isDate(val) {
  return type(val) === 'Date';
};

export default isDate;