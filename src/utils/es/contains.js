import isServer from "./is-server.js";
import getDocument from "./get-document.js";

var contains = function (context, el) {
  if (isServer || typeof window === 'undefined') {
    return;
  }

  var doc = getDocument(el);
  var docElem = doc.documentElement;
  var nativeReg = /^[^{]+\{\s*\[native \w/;
  var isNativeSupport = nativeReg.test(docElem.compareDocumentPosition) || nativeReg.test(docElem.contains);
  return isNativeSupport ? function (context, el) {
    var ele = context.nodeType === 9 ? context.documentElement : context;
    var parentNode = el && el.parentNode;
    return context === parentNode || !!(parentNode && parentNode.nodeType === 1 && (ele.contains ? ele.contains(parentNode) : context.compareDocumentPosition && context.compareDocumentPosition(parentNode) & 16));
  } : function (context, el) {
    if (el) {
      while (el = el.parentNode) {
        if (el === context) {
          return true;
        }
      }

      return false;
    }
  };
}();

export default contains;