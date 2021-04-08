import type from '../test/type.js';
const isArray = val => type(val) === 'Array';

export default isArray;
