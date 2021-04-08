import once from '../event/once.js';
import scrollTop from '../dom/scroll-top.js';
import height from '../dom/height.js';
import getDocument from '../dom/get-document.js';
import isWindow from '../test/is-window.js';
import isDocument from '../test/is-document.js';

const scrollLoad = (el, fn) => {
  const opts = {
    isTop: true,
    isBottom: false
  };
  const isWin = isWindow(el);
  const isDoc = isDocument(el);
  if (isWin || isDoc) {
    el = getDocument(el).body;
  }
  once(el, 'scroll', e => {
    const scrollHeight = height(el, 'scroll');
    const elHeight = height(el);
    const st = scrollTop(el);
    opts.isTop = st === 0;
    opts.isBottom = st + elHeight >= scrollHeight;
    if (opts.isTop || opts.isBottom) {
      fn(opts, e);
    }
  });
};

export default scrollLoad;
