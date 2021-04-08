import isServer from '../test/is-server.js';
import getDocument from '../dom/get-document.js';

const contains = (function(context, el) {
  if (isServer || typeof window === 'undefined') {
    return;
  }
  const doc = getDocument(el);
  const docElem = doc.documentElement;
  const nativeReg = /^[^{]+\{\s*\[native \w/;
  const isNativeSupport =
    nativeReg.test(docElem.compareDocumentPosition) ||
    nativeReg.test(docElem.contains);
  return isNativeSupport
    ? function(context, el) {
        const ele = context.nodeType === 9 ? context.documentElement : context;
        const parentNode = el && el.parentNode;
        return (
          context === parentNode ||
          !!(
            parentNode &&
            parentNode.nodeType === 1 &&
            (ele.contains
              ? ele.contains(parentNode)
              : context.compareDocumentPosition &&
                context.compareDocumentPosition(parentNode) & 16)
          )
        );
      }
    : function(context, el) {
        if (el) {
          while ((el = el.parentNode)) {
            if (el === context) {
              return true;
            }
          }
          return false;
        }
      };
})();

export default contains;
