"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getBrowserPrefix = function getBrowserPrefix() {
  var doc = document.body || document.documentElement;
  var style = doc.style;
  var prefix = ['webkit', 'moz', 'ms', 'o', 'khtml'];

  for (var _i = 0, _prefix = prefix; _i < _prefix.length; _i++) {
    var item = _prefix[_i];

    if ("".concat(item, "TransitionProperty") in style) {
      return "-".concat(item, "-");
    }
  }

  return '';
};

var _default = getBrowserPrefix;
exports["default"] = _default;