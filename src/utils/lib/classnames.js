"use strict";

require("core-js/modules/es.array.join");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isString = _interopRequireDefault(require("./is-string.js"));

var _isNumber = _interopRequireDefault(require("./is-number.js"));

var _isObject = _interopRequireDefault(require("./is-object.js"));

var _isArray = _interopRequireDefault(require("./is-array.js"));

var _hasOwn = _interopRequireDefault(require("./has-own.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var classNames = function classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];

    if (!arg) {
      continue;
    }

    if ((0, _isString["default"])(arg) || (0, _isNumber["default"])(arg)) {
      classes.push(arg);
    } else if ((0, _isArray["default"])(arg) && arg.length) {
      var inner = classNames.apply(null, arg);

      if (inner) {
        classes.push(inner);
      }
    } else if ((0, _isObject["default"])(arg)) {
      for (var key in arg) {
        if ((0, _hasOwn["default"])(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

var _default = classNames;
exports["default"] = _default;