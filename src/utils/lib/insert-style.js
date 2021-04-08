"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isServer = _interopRequireDefault(require("./is-server.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var insertStyle = function insertStyle(style, id) {
  if (_isServer["default"] || typeof window === 'undefined') {
    return;
  }

  if (document.all) {
    window.style = style;
    document.createStyleSheet('javascript:style');
  } else {
    var $id = document.getElementById(id);

    if (id && $id) {
      $id.innerHTML = style;
    } else {
      var _$id = document.getElementById(id);

      if (id && _$id) {
        _$id.innerHTML = style;
      } else {
        var $style = document.createElement('style');

        if (id && !_$id) {
          $style.id = id;
        }

        $style.type = 'text/css';
        $style.innerHTML = style;
        document.getElementsByTagName('head').item(0).appendChild($style);
      }
    }
  }
};

var _default = insertStyle;
exports["default"] = _default;