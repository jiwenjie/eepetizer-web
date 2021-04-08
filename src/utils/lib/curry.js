"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.object.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isFunction = _interopRequireDefault(require("./is-function"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ = (0, _isFunction["default"])(Symbol) ? Symbol('curry') : 0x9ad8;

var hasPlaceholder = function hasPlaceholder(args, arity) {
  for (var i = 0; i < arity; i++) {
    if (args[i] === _) {
      return true;
    }
  }
};

var getArgs = function getArgs(originalArgs, nextArgs) {
  var length = originalArgs.length;
  var nextLength = nextArgs.length;
  var args = new Array(length);
  var nextArgsIndex = 0;

  for (var index = 0; index < length; index++) {
    args[index] = originalArgs[index] === _ && nextArgsIndex < nextLength ? nextArgs[nextArgsIndex++] : originalArgs[index];
  }

  while (nextArgsIndex < nextLength) {
    args.push(nextArgs[nextArgsIndex]);
    nextArgsIndex++;
  }

  return args;
};

var uncurry = function uncurry(curried) {
  return curried.fn;
};

var curry = function curry(fn) {
  var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;

  function curried() {
    var args = arguments;
    return args.length >= arity && !hasPlaceholder(args, arity) ? fn.apply(this, args) : function () {
      return curried.apply(this, getArgs(args, arguments));
    };
  }

  curried.arity = arity;
  curried.fn = fn;
  return curried;
};

curry._ = _;
curry.uncurry = uncurry;
var _default = curry;
exports["default"] = _default;