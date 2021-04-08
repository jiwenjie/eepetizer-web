import isServer from "./is-server.js";
import isWindow from "./is-window.js";
import offResize from "./off-resize.js";

var polyfill = function polyfill(el, event, fn) {
  if (event === 'resize') {
    if (!isWindow(el)) {
      offResize(el, fn);
    }
  }
};

var off = function () {
  if (isServer || typeof window === 'undefined') {
    return;
  }

  if (window.removeEventListener) {
    return function (el, event, fn) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      polyfill(el, event, fn);
      el.removeEventListener(event, fn, capture);
    };
  } else {
    return function (el, event, fn) {
      polyfill(el, event, fn);
      el.detachEvent("on".concat(event), fn.prototype["$$".concat(event)].$$function);

      if (fn.prototype["$$".concat(event)].$$el.length === 1) {
        delete fn.prototype["$$".concat(event)];
      } else {
        for (var i in fn.prototype["$$".concat(event)].$$el) {
          if (fn.prototype["$$".concat(event)].$$el[i] === el) {
            fn.prototype["$$".concat(event)].$$el.splice(i, 1);
            break;
          }
        }
      }
    };
  }
}();

export default off;