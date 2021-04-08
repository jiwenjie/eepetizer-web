import isUndefined from "./is-undefined.js";
var isServer = typeof window !== 'undefined' ? isUndefined(window || document) : false;
export default isServer;