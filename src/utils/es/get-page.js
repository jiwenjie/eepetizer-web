import getDocument from "./get-document.js";
import { scrollTop, scrollLeft } from "./scroll.js"; // ?? 兼容性专用

var getPage = function getPage(e, type) {
  var pageX = e.pageX || e.clientX + scrollLeft(getDocument());
  var pageY = e.pageY || e.clientY + scrollTop(getDocument());

  if (type === 'x') {
    return pageX;
  } else if (type === 'y') {
    return pageY;
  } else {
    return {
      pageX: pageX,
      pageY: pageY
    };
  }
};

var getPageX = function getPageX(e) {
  return getPage(e, 'x');
};

var getPageY = function getPageY(e) {
  return getPage(e, 'y');
};

export { getPageX, getPageY };
export default getPage;