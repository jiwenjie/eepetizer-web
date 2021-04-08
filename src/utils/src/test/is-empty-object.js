import isObject from '../test/is-object.js';

const isEmptyObject = val =>
  isObject(val) ? Object.keys(val).length === 0 : false;

export default isEmptyObject;
