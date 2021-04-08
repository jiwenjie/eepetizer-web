/**
 * 设置cookie
 * @export
 * @param {string} name
 * @param {any} value
 * @param {any} expiredays
 */
var setCookie = function setCookie(name, value, expiredays) {
  var exdate = new Date();

  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays);
  }

  document.cookie = name + '=' + escape(value) + (expiredays === null ? '' : ';expires=' + exdate.toGMTString()) + ';path=/;';
};

export default setCookie;