import getDocument from '../dom/get-document.js';
import { scrollTop, scrollLeft } from '../dom/scroll.js';

// ?? 兼容性专用
const getPage = (e, type) => {
  const pageX = e.pageX || e.clientX + scrollLeft(getDocument());
  const pageY = e.pageY || e.clientY + scrollTop(getDocument());
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

const getPageX = e => getPage(e, 'x');
const getPageY = e => getPage(e, 'y');

export { getPageX, getPageY };

export default getPage;
