import isFunction from '../test/is-function';

const _ = isFunction(Symbol) ? Symbol('curry') : 0x9ad8;

const hasPlaceholder = (args, arity) => {
  for (let i = 0; i < arity; i++) {
    if (args[i] === _) {
      return true;
    }
  }
};

const getArgs = (originalArgs, nextArgs) => {
  const length = originalArgs.length;
  const nextLength = nextArgs.length;
  const args = new Array(length);

  let nextArgsIndex = 0;

  for (let index = 0; index < length; index++) {
    args[index] =
      originalArgs[index] === _ && nextArgsIndex < nextLength
        ? nextArgs[nextArgsIndex++]
        : originalArgs[index];
  }

  while (nextArgsIndex < nextLength) {
    args.push(nextArgs[nextArgsIndex]);
    nextArgsIndex++;
  }

  return args;
};

const uncurry = curried => curried.fn;

const curry = function(fn, arity = fn.length) {
  function curried() {
    const args = arguments;
    return args.length >= arity && !hasPlaceholder(args, arity)
      ? fn.apply(this, args)
      : function() {
          return curried.apply(this, getArgs(args, arguments));
        };
  }

  curried.arity = arity;
  curried.fn = fn;

  return curried;
};

curry._ = _;

curry.uncurry = uncurry;

export default curry;
