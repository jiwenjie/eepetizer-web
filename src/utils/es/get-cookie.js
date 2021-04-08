/**
 * 获取cookie
 * @export
 * @param {any} name
 * @returns
 */
var getCookie = function getCookie(name) {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(name + '=');
    var end = 0;

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }

  return '';
};

export default getCookie;