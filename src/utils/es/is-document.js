import isNil from "./is-nil.js";

var isDocument = function isDocument(el) {
  return !isNil(el) ? el.nodeType === 9 : false;
};

export default isDocument;