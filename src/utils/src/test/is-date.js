import type from '../test/type.js';
const isDate = val => type(val) === 'Date';

export default isDate;
