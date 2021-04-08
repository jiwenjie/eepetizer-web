import type from "./type.js";

var isMath = function isMath(val) {
  return type(val) === 'Math';
};

export default isMath;