"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/esnext.weak-map.delete-all");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stack = function () {
  var items = new WeakMap();

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);

      items.set(this, []);
    }

    _createClass(Stack, [{
      key: "promise",
      value: function promise(_promise) {
        var q = items.get(this);
        q.push(_promise);
        return new Promise(function (resolve, reject) {
          _promise.then(function (res) {
            var lastPromise = q[q.length - 1];

            if (_promise === lastPromise) {
              resolve(_promise);
            }
          })["catch"](function (err) {
            reject(err);
          });
        });
      }
    }]);

    return Stack;
  }();

  return Stack;
}();

var _default = Stack;
exports["default"] = _default;