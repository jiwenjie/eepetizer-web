import qs from 'qs';

/**
 * @Author: zhuxiankang
 * @Date:   2018-10-23 13:50:28
 * @Desc:   设置当前窗口的ICON和TITLE和父窗口一致
 * @Parm:
 */
const setHead = () => {
  const data = window.location.href.split('?');
  if (!data.length && !data[1]) return;
  const { icon, title } = qs.parse(data[1]);

  // 设置ICON
  if (icon) {
    const ieIcon = document.querySelector('link[rel="shortcut icon"]');
    const chromeIcon = document.querySelector('link[rel="icon"]');
    if (ieIcon) {
      ieIcon.href = icon;
    }
    if (chromeIcon) {
      chromeIcon.href = icon;
    }
  }

  // 设置TITLE
  if (title) {
    document.title = title;
  }
};

export default setHead;
