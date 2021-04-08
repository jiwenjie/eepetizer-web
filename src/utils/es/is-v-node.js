import isNull from "./is-null.js";
import type from "./type.js";

var isVNode = function isVNode(node) {
  return !isNull(node) && type(node) === 'Object' && hasOwnProperty.call(node, 'componentOptions');
};

export default isVNode;