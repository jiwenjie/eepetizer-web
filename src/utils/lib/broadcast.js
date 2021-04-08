"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.function.name");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _this = void 0;

function _broadcast(componentName, event, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [event].concat(params));
    } else {
      _broadcast.apply(child, [componentName, event].concat([params]));
    }
  });
}

var broadcast = function broadcast(context, componentName, event, params) {
  _broadcast.call(context || _this, componentName, event, params);
};

var _default = broadcast;
exports["default"] = _default;