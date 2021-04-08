import isUndefined from '../test/is-undefined.js';

const isServer =
  typeof window !== 'undefined' ? isUndefined(window || document) : false;

export default isServer;
