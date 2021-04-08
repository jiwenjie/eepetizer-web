"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getBrowserInfo = function getBrowserInfo() {
  var browserInfo = {};

  if ('navigator' in window) {
    var ua = navigator.userAgent;

    var getBrowser = function getBrowser() {
      switch (true) {
        case /opr|opios|opera/i.test(ua):
          return 'Opera';

        case /chrome|chromium|crios|crmo/i.test(ua):
          return 'Chrome';

        case /firefox|iceweasel|fxios/i.test(ua):
          return 'Firefox';

        case /safari|applewebkit/i.test(ua):
          return 'Safari';

        case /edg([ea]|ios)/i.test(ua):
          return 'Microsoft Edge';

        case /msie|trident/i.test(ua):
          return 'Internet Explorer';
      }

      return 'Unknown';
    };

    var getBrowserVersion = function getBrowserVersion() {
      var matchVersion = function matchVersion(regexp) {
        var match = ua.match(regexp);
        return match && match.length > 0 && match[1] || '';
      };

      switch (getBrowser()) {
        case 'Opera':
          return matchVersion(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i) || matchVersion(/(?:opr|opios)[\s/](\S+)/i);

        case 'Chrome':
          return matchVersion(/(?:chrome|crios|crmo)\/([\d\w\\.\\-]+)/i) || matchVersion(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i);

        case 'Firefox':
          return matchVersion(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i);

        case 'Safari':
          return matchVersion(/version\/(\d+(\.?_?\d+)+)/i);

        case 'Microsoft Edge':
          return +matchVersion(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i);

        case 'Internet Explorer':
          return +matchVersion(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i);
      }
    };

    var getEngine = function getEngine() {
      switch (true) {
        case /edge/i.test(ua):
          return 'Edge';

        case /msie|trident/i.test(ua):
          return 'Trident';

        case /(presto)\/([\w.]+)/i.test(ua):
          return 'Presto';

        case /webKit|appleWebKit/i.test(ua):
          return 'Webkit';

        case /rv:([\w.]{1,9}).+(gecko)/i.test(ua):
          return 'Gecko';
      }

      return 'Unknown';
    };

    var getOs = function getOs() {
      switch (true) {
        case /iphone/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua):
          return 'ios';

        case /android/i.test(ua):
          return 'android';

        case /win/i.test(ua) && /phone/i.test(ua):
          return 'windowsPhone';

        case /mac/i.test(ua):
          return 'macOSX';

        case /win/i.test(ua):
          return 'windows';

        case /linux/i.test(ua):
          return 'linux';
      }

      return 'Unknown';
    };

    browserInfo = {
      name: getBrowser(),
      version: getBrowserVersion(),
      engine: getEngine(),
      os: getOs()
    };
    return browserInfo;
  }
};

var _default = getBrowserInfo;
exports["default"] = _default;