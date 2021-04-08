import isNull from "./is-null.js";
import isObject from "./is-object.js";

var isVNode = function isVNode(node) {
  return !isNull(node) && isObject(node) && hasOwnProperty.call(node, 'render');
};

export default isVNode;