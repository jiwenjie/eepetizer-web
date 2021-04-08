/**
 * 设置cookie
 * @export
 * @param {string} name
 * @param {any} value
 * @param {any} expiredays
 */
const setCookie = (name, value, expiredays) => {
  const exdate = new Date();
  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays);
  }
  document.cookie =
    name +
    '=' +
    escape(value) +
    (expiredays === null ? '' : ';expires=' + exdate.toGMTString()) +
    ';path=/;';
};

export default setCookie;
