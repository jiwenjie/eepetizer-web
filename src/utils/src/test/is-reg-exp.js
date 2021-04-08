import type from '../test/type.js';
const isRegexp = val => type(val) === 'RegExp';

export default isRegexp;
