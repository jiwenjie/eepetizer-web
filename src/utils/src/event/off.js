import isServer from '../test/is-server.js';
import isWindow from '../test/is-window.js';
import offResize from '../event/off-resize.js';

const polyfill = (el, event, fn) => {
  if (event === 'resize') {
    if (!isWindow(el)) {
      offResize(el, fn);
    }
  }
};

const off = (function() {
  if (isServer || typeof window === 'undefined') {
    return;
  }
  if (window.removeEventListener) {
    return function(el, event, fn, capture = false) {
      polyfill(el, event, fn);
      el.removeEventListener(event, fn, capture);
    };
  } else {
    return function(el, event, fn) {
      polyfill(el, event, fn);
      el.detachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function);
      if (fn.prototype[`$$${event}`].$$el.length === 1) {
        delete fn.prototype[`$$${event}`];
      } else {
        for (const i in fn.prototype[`$$${event}`].$$el) {
          if (fn.prototype[`$$${event}`].$$el[i] === el) {
            fn.prototype[`$$${event}`].$$el.splice(i, 1);
            break;
          }
        }
      }
    };
  }
})();

export default off;
