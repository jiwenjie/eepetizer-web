function _dispatch(componentName, event, params) {
  let parent = this.$parent || this.$root;
  let name = parent.$options.name;

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

const dispatch = (context, componentName, event, params) => {
  _dispatch.call(context || this, componentName, event, params);
};

export default dispatch;
