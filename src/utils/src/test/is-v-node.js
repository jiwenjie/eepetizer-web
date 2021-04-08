import isNull from '../test/is-null.js';
import type from '../test/type.js';

const isVNode = node => {
  return (
    !isNull(node) &&
    type(node) === 'Object' &&
    hasOwnProperty.call(node, 'componentOptions')
  );
};

export default isVNode;
