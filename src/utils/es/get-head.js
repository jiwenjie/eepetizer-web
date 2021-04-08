function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import qs from 'qs';
/**
 * @Author: zhuxiankang
 * @Date:   2018-10-23 13:49:55
 * @Desc:   获取父窗口的ICON和TITLE
 * @Parm:   href  -> 需要链接的地址
 * @Return: icon  -> icon地址
 *          title -> title信息
 *          href  -> 根据传进来的url进行组装后的url
 */

var getHead = function getHead(href) {
  var parentDocument = window.parent.document;
  if (!parentDocument) return;
  var parentIcon = parentDocument.querySelector('link[rel="icon"]');
  var data = {
    icon: parentIcon && parentIcon.href,
    title: parentDocument.title
  };
  return _objectSpread(_objectSpread({}, data), {}, {
    href: href && href.includes('?') ? "".concat(href, "&").concat(qs.stringify(data)) : "".concat(href, "?").concat(qs.stringify(data))
  });
};

export default getHead;