import on from "./on.js";
import isUndefined from "./is-undefined.js";

var scrollUnique = function scrollUnique(el) {
  var eventType = 'mousewheel';

  if (!isUndefined(document.mozHidden)) {
    eventType = 'DOMMouseScroll';
  }

  on(el, eventType, function (event) {
    var scrollTop = this.scrollTop;
    var scrollHeight = this.scrollHeight;
    var height = this.clientHeight;
    var delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);

    if (delta > 0 && scrollTop <= delta || delta < 0 && scrollHeight - height - scrollTop <= -1 * delta) {
      this.scrollTop = delta > 0 ? 0 : scrollHeight;
      event.preventDefault();
    }
  });
};

export default scrollUnique;