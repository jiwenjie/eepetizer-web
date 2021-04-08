"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hasClass = _interopRequireDefault(require("./has-class.js"));

var _trim = _interopRequireDefault(require("./trim.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var removeClass = function removeClass(el, cls) {
  var classes = cls.split(' ');
  var curClass = " ".concat(el.className, " ");

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];

    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if ((0, _hasClass["default"])(el, clsName)) {
      curClass = curClass.replace(" ".concat(clsName, " "), ' ');
    }
  }

  if (!el.classList) {
    el.className = (0, _trim["default"])(curClass);
  }
};

var _default = removeClass;
exports["default"] = _default;