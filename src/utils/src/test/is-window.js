import isNil from '../test/is-nil.js';
const isWindow = el => (!isNil(el) ? el === el.window : false);

export default isWindow;
