"use strict";

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject = _interopRequireDefault(require("./is-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isEmptyObject = function isEmptyObject(val) {
  return (0, _isObject["default"])(val) ? Object.keys(val).length === 0 : false;
};

var _default = isEmptyObject;
exports["default"] = _default;