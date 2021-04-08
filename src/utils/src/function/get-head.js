import qs from 'qs';

/**
 * @Author: zhuxiankang
 * @Date:   2018-10-23 13:49:55
 * @Desc:   获取父窗口的ICON和TITLE
 * @Parm:   href  -> 需要链接的地址
 * @Return: icon  -> icon地址
 *          title -> title信息
 *          href  -> 根据传进来的url进行组装后的url
 */
const getHead = href => {
  const parentDocument = window.parent.document;
  if (!parentDocument) return;
  const parentIcon = parentDocument.querySelector('link[rel="icon"]');

  const data = {
    icon: parentIcon && parentIcon.href,
    title: parentDocument.title
  };

  return {
    ...data,
    href:
      href && href.includes('?')
        ? `${href}&${qs.stringify(data)}`
        : `${href}?${qs.stringify(data)}`
  };
};

export default getHead;
