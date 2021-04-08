import getOffsetParent from "./get-offset-parent.js";
import getNodeName from "./get-node-name.js";
import offset from "./offset";
import style from "./style.js";
import { scrollTop, scrollLeft } from "./scroll.js";

var position = function position(el, offsetParent) {
  var parentOffset = {
    top: 0,
    left: 0
  };
  var nodeOffset;

  if (style(el, 'position') === 'fixed') {
    nodeOffset = el.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || getOffsetParent(el);
    nodeOffset = offset(el);

    if (getNodeName(offsetParent) !== 'html') {
      parentOffset = offset(offsetParent);
    }

    parentOffset.top += parseInt(style(offsetParent, 'borderTopWidth')) - scrollTop(offsetParent) || 0;
    parentOffset.left += parseInt(style(offsetParent, 'borderLeftWidth')) - scrollLeft(offsetParent) || 0;
  }

  return {
    top: nodeOffset.top - parentOffset.top - (parseInt(style(el, 'marginTop')) || 0),
    left: nodeOffset.left - parentOffset.left - (parseInt(style(el, 'marginLeft')) || 0)
  };
};

export default position;