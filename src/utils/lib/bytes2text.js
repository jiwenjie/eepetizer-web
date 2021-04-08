"use strict";

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var bytes2text = function bytes2text(bytes) {
  var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (isNaN(bytes)) {
    return '';
  }

  var symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var exp = Math.floor(Math.log(bytes) / Math.log(2));

  if (exp < 1) {
    exp = 0;
  }

  var i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  if (bytes.toString().length > bytes.toFixed(point).toString().length) {
    bytes = bytes.toFixed(point);
  }

  return bytes + ' ' + symbols[i];
};

var _default = bytes2text;
exports["default"] = _default;