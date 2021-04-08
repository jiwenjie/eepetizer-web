import isObject from '../test/is-object.js';
import isString from '../test/is-string.js';

/**
 * @desc 将对象格式的字符串转成对象
 * @author chenguanbin
 * @param {String} string 对象格式的字符串
 * @return 转换后的对象
 */
const _string2object = string => {
  // 传入的不是字符串则直接返回
  if (!isString(string)) return string;
  const object = {};
  const array = string.split('&');
  for (const item of array) {
    const arr = item.split('=');
    // 过滤掉第一个等号前的值，那是key，后面的都是参数值
    const value = arr.slice(1).join('=');
    object[arr[0]] = value ? decodeURIComponent(value) : '';
  }
  return object;
};

/**
 * @desc 将对象转成对象格式的字符串
 * @author chenguanbin
 * @param {Object} object 对象
 * @return 转换后的字符串
 */
const _object2string = object => {
  // 传入的不是对象则直接返回
  if (!isObject(object)) return object;
  const array = [];
  for (const key of Object.keys(object)) {
    array.push(`${key}=${encodeURIComponent(object[key])}`);
  }
  return array.join('&');
};

/**
 * @desc 参数只有空格时，将其替换成空字符串
 * @author chenguanbin
 * @param {Object} params 请求参数
 * @return 处理有的参数
 */
const _trimOnlySpace = params => {
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (!value || !isString(value)) continue;
    if (value.trim() === '') params[key] = '';
  }
  return params;
};

/**
 * @desc 当 axios 请求参数中只有空格时，将其替换成空字符串
 * @author chenguanbin
 * @param {Object} config axios 请求拦截器的 config 对象
 * @return 处理后的请求参数
 */
const trimOnlySpace = config => {
  if (config.method === 'get' && config.params) {
    config.params = _trimOnlySpace(config.params);
  }
  if (config.method === 'post' && config.data) {
    const data = config.data;
    // 是对象则直接处理，否则转成对象再处理
    if (isObject(data)) {
      config.data = _trimOnlySpace(data);
    } else {
      let params = _string2object(config.data);
      params = _trimOnlySpace(params);
      config.data = _object2string(params);
    }
  }
  return config;
};

export default trimOnlySpace;
