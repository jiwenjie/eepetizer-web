import isUndefined from '../test/is-undefined.js';
import isNull from '../test/is-null.js';

const isNil = val => isUndefined(val) || isNull(val);

export default isNil;
