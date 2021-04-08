import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';

/**
 * @desc 元素大小变化时的动作
 * @param {Array} entries 监听元素的集合
 */
const resizeHandler = entries => {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  }
};

/**
 * @desc 监听元素大小变化
 * @param {Document} el 监听的元素
 * @param {Function} fn 回调函数
 */
const onResize = (el, fn) => {
  if (isServer) return;
  if (!el.__resizeListeners__) {
    el.__resizeListeners__ = [];
    el.__ro__ = new ResizeObserver(resizeHandler);
    el.__ro__.observe(el);
  }
  el.__resizeListeners__.push(fn);
};

export default onResize;
