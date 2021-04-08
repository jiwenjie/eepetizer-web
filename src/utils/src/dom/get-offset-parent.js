import getDocument from '../dom/get-document.js';
import getNodeName from '../dom/get-node-name.js';
import style from '../dom/style.js';

const getOffsetParent = el => {
  const doc = getDocument(el);
  let offsetParent = el && el.offsetParent;
  while (
    offsetParent &&
    getNodeName(el) !== 'html' &&
    style(offsetParent, 'position') === 'static'
  ) {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};

export default getOffsetParent;
