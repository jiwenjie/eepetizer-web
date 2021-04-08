var throttle = function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    noStart: false,
    noEnd: false
  };
  var context, args, result;
  var timeout = null;
  var previous = 0;

  var later = function later() {
    previous = opts.noStart ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    var now = +new Date();

    if (!previous && opts.noStart) {
      previous = now;
    }

    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && !opts.noEnd) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
};

export default throttle;