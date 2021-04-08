import isBuffer from "./is-buffer.js";
import isError from "./is-error.js";
import isArguments from "./is-arguments.js";

var type = function type(val) {
  if (val === void 0) {
    return 'Undefined';
  }

  if (val === null) {
    return 'Null';
  }

  var ctorName = function ctorName(val) {
    return val.constructor ? val.constructor.name : null;
  };

  switch (ctorName(val)) {
    case 'Symbol':
      return 'Symbol';

    case 'Promise':
      return 'Promise';

    case 'Map':
      return 'Map';

    case 'Set':
      return 'Set';

    case 'WeakMap':
      return 'WeakMap';

    case 'WeakSet':
      return 'WeakSet';
  }

  if (isBuffer(val)) {
    return 'Buffer';
  }

  if (isError(val)) {
    return 'Error';
  }

  if (isArguments(val)) {
    return 'Arguments';
  }

  var type = Object.prototype.toString.call(val).slice(8, -1).replace(/\s/g, '');

  if (type === 'Number' && val % 1 === 0) {
    return 'Integer';
  }

  if (type === 'Number' && /.*\..*/.test(val)) {
    return 'Float';
  }

  return type;
};

export default type;