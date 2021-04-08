import isElement from '../test/is-element.js';
import getDocument from '../dom/get-document.js';

const scrollTo = (el, to, duration = 0) => {
  const doc = getDocument(el);
  if (!isElement(el)) {
    duration = to || 0;
    to = el;
    el = doc.documentElement || doc.body;
  }

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    function requestAnimationFrameTimeout() {
      return setTimeout(arguments[0], 10);
    };
  // jump to target if duration zero
  if (duration <= 0) {
    el.scrollTop = to;
    return;
  }
  const difference = to - el.scrollTop;
  const perTick = (difference / duration) * 10;

  requestAnimationFrame(() => {
    el.scrollTop += perTick;
    if (el.scrollTop === to) return;
    scrollTo(el, to, duration - 10);
  });
};

export default scrollTo;
