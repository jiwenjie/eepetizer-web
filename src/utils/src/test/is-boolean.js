import type from '../test/type.js';
const isBoolean = val => type(val) === 'Boolean';

export default isBoolean;
