"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isBuffer = _interopRequireDefault(require("./is-buffer.js"));

var _isError = _interopRequireDefault(require("./is-error.js"));

var _isArguments = _interopRequireDefault(require("./is-arguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var type = function type(val) {
  if (val === void 0) {
    return 'Undefined';
  }

  if (val === null) {
    return 'Null';
  }

  var ctorName = function ctorName(val) {
    return val.constructor ? val.constructor.name : null;
  };

  switch (ctorName(val)) {
    case 'Symbol':
      return 'Symbol';

    case 'Promise':
      return 'Promise';

    case 'Map':
      return 'Map';

    case 'Set':
      return 'Set';

    case 'WeakMap':
      return 'WeakMap';

    case 'WeakSet':
      return 'WeakSet';
  }

  if ((0, _isBuffer["default"])(val)) {
    return 'Buffer';
  }

  if ((0, _isError["default"])(val)) {
    return 'Error';
  }

  if ((0, _isArguments["default"])(val)) {
    return 'Arguments';
  }

  var type = Object.prototype.toString.call(val).slice(8, -1).replace(/\s/g, '');

  if (type === 'Number' && val % 1 === 0) {
    return 'Integer';
  }

  if (type === 'Number' && /.*\..*/.test(val)) {
    return 'Float';
  }

  return type;
};

var _default = type;
exports["default"] = _default;