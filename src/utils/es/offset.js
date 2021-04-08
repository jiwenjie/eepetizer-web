import getDocument from "./get-document.js";
import contains from "./contains.js";
import scrollLeft from "./scroll-left.js";
import scrollTop from "./scroll-top.js";

var offset = function offset(el, container) {
  var doc = getDocument(el);
  container = container || doc.documentElement || doc.body;
  var rect = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  if (!contains(container, el)) {
    return rect;
  }

  if (el.getBoundingClientRect) {
    rect = el.getBoundingClientRect();
  }

  var clientTop = container.clientTop || 0;
  var clientLeft = container.clientLeft || 0;
  var top, left; // 存在容器时，获取元素到容器左上角的相对位置

  if (container === doc.documentElement || container === doc.body) {
    top = scrollTop(container);
    left = scrollLeft(container);
  } else {
    var containerRect = container.getBoundingClientRect();
    top = scrollTop(container) - containerRect.top;
    left = scrollLeft(container) - containerRect.left;
  }

  rect = {
    top: rect.top + top - clientTop,
    left: rect.left + left - clientLeft,
    right: rect.right + left - clientLeft,
    bottom: rect.bottom + top - clientTop
  };
  return rect;
};

export default offset;