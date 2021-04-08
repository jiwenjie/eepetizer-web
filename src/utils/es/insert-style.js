import isServer from "./is-server.js";

var insertStyle = function insertStyle(style, id) {
  if (isServer || typeof window === 'undefined') {
    return;
  }

  if (document.all) {
    window.style = style;
    document.createStyleSheet('javascript:style');
  } else {
    var $id = document.getElementById(id);

    if (id && $id) {
      $id.innerHTML = style;
    } else {
      var _$id = document.getElementById(id);

      if (id && _$id) {
        _$id.innerHTML = style;
      } else {
        var $style = document.createElement('style');

        if (id && !_$id) {
          $style.id = id;
        }

        $style.type = 'text/css';
        $style.innerHTML = style;
        document.getElementsByTagName('head').item(0).appendChild($style);
      }
    }
  }
};

export default insertStyle;