import on from '../event/on.js';
import isUndefined from '../test/is-undefined.js';

const scrollUnique = el => {
  let eventType = 'mousewheel';
  if (!isUndefined(document.mozHidden)) {
    eventType = 'DOMMouseScroll';
  }
  on(el, eventType, function(event) {
    const scrollTop = this.scrollTop;
    const scrollHeight = this.scrollHeight;
    const height = this.clientHeight;

    const delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);

    if (
      (delta > 0 && scrollTop <= delta) ||
      (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)
    ) {
      this.scrollTop = delta > 0 ? 0 : scrollHeight;
      event.preventDefault();
    }
  });
};

export default scrollUnique;
