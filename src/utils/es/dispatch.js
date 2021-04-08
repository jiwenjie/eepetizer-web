var _this = this;

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

export default dispatch;