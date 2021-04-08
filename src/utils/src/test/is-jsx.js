import isNull from '../test/is-null.js';
import isObject from '../test/is-object.js';

const isVNode = node => {
  return !isNull(node) && isObject(node) && hasOwnProperty.call(node, 'render');
};

export default isVNode;
