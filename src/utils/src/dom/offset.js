import getDocument from '../dom/get-document.js';
import contains from '../test/contains.js';
import scrollLeft from '../dom/scroll-left.js';
import scrollTop from '../dom/scroll-top.js';

const offset = (el, container) => {
  const doc = getDocument(el);
  container = container || doc.documentElement || doc.body;

  let rect = { top: 0, left: 0, right: 0, bottom: 0 };
  if (!contains(container, el)) {
    return rect;
  }
  if (el.getBoundingClientRect) {
    rect = el.getBoundingClientRect();
  }

  const clientTop = container.clientTop || 0;
  const clientLeft = container.clientLeft || 0;
  let top, left;

  // 存在容器时，获取元素到容器左上角的相对位置
  if (container === doc.documentElement || container === doc.body) {
    top = scrollTop(container);
    left = scrollLeft(container);
  } else {
    const containerRect = container.getBoundingClientRect();
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
