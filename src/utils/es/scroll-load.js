import once from "./once.js";
import scrollTop from "./scroll-top.js";
import height from "./height.js";
import getDocument from "./get-document.js";
import isWindow from "./is-window.js";
import isDocument from "./is-document.js";

var scrollLoad = function scrollLoad(el, fn) {
  var opts = {
    isTop: true,
    isBottom: false
  };
  var isWin = isWindow(el);
  var isDoc = isDocument(el);

  if (isWin || isDoc) {
    el = getDocument(el).body;
  }

  once(el, 'scroll', function (e) {
    var scrollHeight = height(el, 'scroll');
    var elHeight = height(el);
    var st = scrollTop(el);
    opts.isTop = st === 0;
    opts.isBottom = st + elHeight >= scrollHeight;

    if (opts.isTop || opts.isBottom) {
      fn(opts, e);
    }
  });
};

export default scrollLoad;