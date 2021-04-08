import getDocument from "./get-document.js";
import isDocument from "./is-document.js";

var getWindow = function getWindow(el) {
  return el && isDocument(el) ? el.defaultView || el.parentWindow : getWindow(getDocument(el));
};

export default getWindow;