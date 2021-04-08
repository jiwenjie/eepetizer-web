var bytes2text = function bytes2text(bytes) {
  var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (isNaN(bytes)) {
    return '';
  }

  var symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var exp = Math.floor(Math.log(bytes) / Math.log(2));

  if (exp < 1) {
    exp = 0;
  }

  var i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  if (bytes.toString().length > bytes.toFixed(point).toString().length) {
    bytes = bytes.toFixed(point);
  }

  return bytes + ' ' + symbols[i];
};

export default bytes2text;