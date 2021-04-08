import isServer from '../test/is-server.js';
import isWindow from '../test/is-window.js';
import onResize from '../event/on-resize.js';

const polyfill = (el, event, fn) => {
  if (event === 'resize') {
    if (!isWindow(el)) {
      onResize(el, fn);
    }
  }
};

const on = (function() {
  if (isServer || typeof window === 'undefined') {
    return;
  }
  if (window.addEventListener) {
    return function(el, event, fn, capture = false) {
      polyfill(el, event, fn);
      el.addEventListener(event, fn, capture);
    };
  } else {
    return function(el, event, fn) {
      polyfill(el, event, fn);
      if (!fn.prototype[`$$${event}`]) {
        fn.prototype[`$$${event}`] = {
          $$function: function(event) {
            fn.call(el, event);
          },
          $$el: [el]
        };
        el.attachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function);
      } else {
        let hasListener = true;
        for (const i in fn.prototype[`$$${event}`].$$el) {
          if (fn.prototype[`$$${event}`].$$el[i] === el) {
            hasListener = false;
            break;
          }
        }
        if (hasListener === true) {
          el.attachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function);
        } else {
          let hasListener = true;
          for (const i in fn.prototype[`$$${event}`].$$el) {
            if (fn.prototype[`$$${event}`].$$el[i] === el) {
              hasListener = false;
              break;
            }
          }
          if (hasListener === true) {
            el.attachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function);
            fn.prototype[`$$${event}`].$$el.push(el);
          }
        }
      }
    };
  }
})();

export default on;
