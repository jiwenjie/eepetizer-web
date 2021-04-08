var _this = this;

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

export default broadcast;