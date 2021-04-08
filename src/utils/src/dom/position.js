import getOffsetParent from '../dom/get-offset-parent.js';
import getNodeName from '../dom/get-node-name.js';
import offset from '../dom/offset';
import style from '../dom/style.js';
import { scrollTop, scrollLeft } from '../dom/scroll.js';

const position = (el, offsetParent) => {
  let parentOffset = { top: 0, left: 0 };
  let nodeOffset;
  if (style(el, 'position') === 'fixed') {
    nodeOffset = el.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || getOffsetParent(el);
    nodeOffset = offset(el);
    if (getNodeName(offsetParent) !== 'html') {
      parentOffset = offset(offsetParent);
    }
    parentOffset.top +=
      parseInt(style(offsetParent, 'borderTopWidth')) -
        scrollTop(offsetParent) || 0;
    parentOffset.left +=
      parseInt(style(offsetParent, 'borderLeftWidth')) -
        scrollLeft(offsetParent) || 0;
  }
  return {
    top:
      nodeOffset.top -
      parentOffset.top -
      (parseInt(style(el, 'marginTop')) || 0),
    left:
      nodeOffset.left -
      parentOffset.left -
      (parseInt(style(el, 'marginLeft')) || 0)
  };
};

export default position;
