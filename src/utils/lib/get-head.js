"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.includes");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    href: href && href.includes('?') ? "".concat(href, "&").concat(_qs["default"].stringify(data)) : "".concat(href, "?").concat(_qs["default"].stringify(data))
  });
};

var _default = getHead;
exports["default"] = _default;