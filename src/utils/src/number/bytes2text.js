const bytes2text = (bytes, point = 2) => {
  if (isNaN(bytes)) {
    return '';
  }
  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  const i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);
  if (bytes.toString().length > bytes.toFixed(point).toString().length) {
    bytes = bytes.toFixed(point);
  }
  return bytes + ' ' + symbols[i];
};

export default bytes2text;
