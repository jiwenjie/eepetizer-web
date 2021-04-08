import type from '../test/type.js';
const isFunction = val => type(val) === 'Function';

export default isFunction;
