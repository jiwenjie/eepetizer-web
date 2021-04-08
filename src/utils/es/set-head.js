import qs from 'qs';
/**
 * @Author: zhuxiankang
 * @Date:   2018-10-23 13:50:28
 * @Desc:   设置当前窗口的ICON和TITLE和父窗口一致
 * @Parm:
 */

var setHead = function setHead() {
  var data = window.location.href.split('?');
  if (!data.length && !data[1]) return;

  var _qs$parse = qs.parse(data[1]),
      icon = _qs$parse.icon,
      title = _qs$parse.title; // 设置ICON


  if (icon) {
    var ieIcon = document.querySelector('link[rel="shortcut icon"]');
    var chromeIcon = document.querySelector('link[rel="icon"]');

    if (ieIcon) {
      ieIcon.href = icon;
    }

    if (chromeIcon) {
      chromeIcon.href = icon;
    }
  } // 设置TITLE


  if (title) {
    document.title = title;
  }
};

export default setHead;