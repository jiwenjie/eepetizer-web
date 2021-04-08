function _broadcast(componentName, event, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [event].concat(params));
    } else {
      _broadcast.apply(child, [componentName, event].concat([params]));
    }
  });
}

const broadcast = (context, componentName, event, params) => {
  _broadcast.call(context || this, componentName, event, params);
};

export default broadcast;
