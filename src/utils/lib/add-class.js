"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hasClass = _interopRequireDefault(require("./has-class.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addClass = function addClass(el, cls) {
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];

    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!(0, _hasClass["default"])(el, clsName)) {
      curClass += " ".concat(clsName);
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
};

var _default = addClass;
exports["default"] = _default;