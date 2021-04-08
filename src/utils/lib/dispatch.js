"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _this = void 0;

function _dispatch(componentName, event, params) {
  var parent = this.$parent || this.$root;
  var name = parent.$options.name;

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.name;
    }
  }

  if (parent) {
    parent.$emit.apply(parent, [event].concat(params));
  }
}

var dispatch = function dispatch(context, componentName, event, params) {
  _dispatch.call(context || _this, componentName, event, params);
};

var _default = dispatch;
exports["default"] = _default;