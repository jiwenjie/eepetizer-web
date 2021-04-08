import on from '../event/on.js';
import off from '../event/off.js';

const once = (el, event, fn) => {
  const listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
  return listener;
};

export default once;
