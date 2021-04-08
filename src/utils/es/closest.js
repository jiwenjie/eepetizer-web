var closest = function closest(el, filter) {
  if (!el || !filter) return null;

  var traverse = function traverse(el) {
    if (el === document || !el.parentNode) {
      return null;
    }

    var nodes = el.parentNode.querySelectorAll(filter);

    if (nodes && nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] === el) return el;
      }
    }

    return traverse(el.parentNode);
  };

  return traverse(el);
};

export default closest;