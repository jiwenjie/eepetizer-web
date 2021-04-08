import type from '../test/type.js';
const isString = val => type(val) === 'String';

export default isString;
