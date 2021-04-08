import isElement from "./is-element.js";
import getDocument from "./get-document.js";

var scrollTo = function scrollTo(el, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var doc = getDocument(el);

  if (!isElement(el)) {
    duration = to || 0;
    to = el;
    el = doc.documentElement || doc.body;
  }

  var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
    return setTimeout(arguments[0], 10);
  }; // jump to target if duration zero


  if (duration <= 0) {
    el.scrollTop = to;
    return;
  }

  var difference = to - el.scrollTop;
  var perTick = difference / duration * 10;
  requestAnimationFrame(function () {
    el.scrollTop += perTick;
    if (el.scrollTop === to) return;
    scrollTo(el, to, duration - 10);
  });
};

export default scrollTo;