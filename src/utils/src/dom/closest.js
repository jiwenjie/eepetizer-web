const closest = (el, filter) => {
  if (!el || !filter) return null;

  const traverse = function(el) {
    if (el === document || !el.parentNode) {
      return null;
    }
    const nodes = el.parentNode.querySelectorAll(filter);
    if (nodes && nodes.length) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === el) return el;
      }
    }
    return traverse(el.parentNode);
  };

  return traverse(el);
};

export default closest;
