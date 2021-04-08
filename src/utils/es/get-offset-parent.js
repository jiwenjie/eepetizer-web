import getDocument from "./get-document.js";
import getNodeName from "./get-node-name.js";
import style from "./style.js";

var getOffsetParent = function getOffsetParent(el) {
  var doc = getDocument(el);
  var offsetParent = el && el.offsetParent;

  while (offsetParent && getNodeName(el) !== 'html' && style(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};

export default getOffsetParent;