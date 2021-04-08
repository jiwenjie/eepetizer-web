import isServer from '../test/is-server.js';

const insertStyle = (style, id) => {
  if (isServer || typeof window === 'undefined') {
    return;
  }
  if (document.all) {
    window.style = style;
    document.createStyleSheet('javascript:style');
  } else {
    const $id = document.getElementById(id);
    if (id && $id) {
      $id.innerHTML = style;
    } else {
      const $id = document.getElementById(id);
      if (id && $id) {
        $id.innerHTML = style;
      } else {
        const $style = document.createElement('style');
        if (id && !$id) {
          $style.id = id;
        }
        $style.type = 'text/css';
        $style.innerHTML = style;
        document
          .getElementsByTagName('head')
          .item(0)
          .appendChild($style);
      }
    }
  }
};

export default insertStyle;
