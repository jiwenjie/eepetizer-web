"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _on = _interopRequireDefault(require("./on.js"));

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var scrollUnique = function scrollUnique(el) {
  var eventType = 'mousewheel';

  if (!(0, _isUndefined["default"])(document.mozHidden)) {
    eventType = 'DOMMouseScroll';
  }

  (0, _on["default"])(el, eventType, function (event) {
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

var _default = scrollUnique;
exports["default"] = _default;