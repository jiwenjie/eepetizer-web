import Vue from 'vue';
import addClass from "./add-class.js";
import removeClass from "./remove-class.js";
var hasModal = false;

var getModal = function getModal(id, multiModal) {
  if (Vue.prototype.$isServer) return;
  var modalDom;

  if (multiModal) {
    modalDom = PopupManager.multiModalDom[id];
  } else {
    modalDom = PopupManager.modalDom;
  }

  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');

    if (multiModal) {
      PopupManager.multiModalDom[id] = modalDom;
    } else {
      PopupManager.modalDom = modalDom;
    }

    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick(id);
    });
  }

  return modalDom;
};

var instances = {};
var PopupManager = {
  multiModalDom: {},
  zIndex: 2000,
  modalFade: true,
  getInstance: function getInstance(id) {
    return instances[id];
  },
  register: function register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister: function deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  },
  modalStack: [],
  multiModalStack: {},
  doOnModalClick: function doOnModalClick(id) {
    var topItem;

    if (PopupManager.multiModalStack[id] !== undefined) {
      topItem = PopupManager.multiModalStack[id][PopupManager.multiModalStack[id].length - 1];
    } else {
      topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    }

    if (!topItem) return;
    var instance = PopupManager.getInstance(topItem.id);

    if (instance && instance.closeOnClickModal) {
      instance.close(topItem.id);
    }
  },
  openModal: function openModal(opts) {
    opts = Object.assign({
      multiModal: false,
      timeout: 200
    }, opts); // id, zIndex, dom, modalClass, modalFade

    if (Vue.prototype.$isServer) return;
    if (!opts.id || opts.zIndex === undefined) return;
    var modalStack;

    if (opts.multiModal) {
      if (!this.multiModalStack[opts.id]) {
        this.multiModalStack[opts.id] = [];
      }

      modalStack = this.multiModalStack[opts.id];
    } else {
      modalStack = this.modalStack;
    }

    for (var i = 0, j = modalStack.length; i < j; i++) {
      var item = modalStack[i];

      if (item.id === opts.id) {
        return;
      }
    }

    var modalDom = getModal(opts.id, opts.multiModal);
    addClass(modalDom, 'v-modal');

    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter');
    }

    if (opts.modalClass) {
      var classArr = opts.modalClass.trim().split(/\s+/);
      classArr.forEach(function (item) {
        return addClass(modalDom, item);
      });
    }

    setTimeout(function () {
      removeClass(modalDom, 'v-modal-enter');
    }, opts.timeout);

    if (opts.dom && opts.dom.parentNode && opts.dom.parentNode.nodeType !== 11) {
      opts.dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (opts.zIndex) {
      modalDom.style.zIndex = opts.zIndex;
    }

    modalDom.style.display = '';
    modalStack.push({
      id: opts.id,
      zIndex: opts.zIndex,
      modalClass: opts.modalClass
    });
  },
  closeModal: function closeModal(_ref) {
    var id = _ref.id,
        timeout = _ref.timeout;
    var modalStack;

    if (this.multiModalStack[id] !== undefined) {
      modalStack = this.multiModalStack[id];
    } else {
      modalStack = this.modalStack;
    }

    var modalDom = getModal(id, PopupManager.multiModalStack[id] !== undefined);
    var topItem = modalStack[modalStack.length - 1];

    if (modalStack.length > 0) {
      if (topItem.id === id) {
        modalStack.pop();

        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (var i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave');
      }

      setTimeout(function () {
        removeClass(modalDom, 'v-modal-leave');

        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);

          if (PopupManager.multiModalStack[id] !== undefined) {
            PopupManager.multiModalDom[id] = null;
          } else {
            PopupManager.modalDom = null;
          }
        } else {
          if (topItem.modalClass) {
            var classArr = topItem.modalClass.trim().split(/\s+/);
            classArr.forEach(function (item) {
              return removeClass(modalDom, item);
            });
          }
        }
      }, timeout - 50);
    }
  }
};

var getTopPopup = function getTopPopup() {
  if (Vue.prototype.$isServer) return;

  if (PopupManager.modalStack.length > 0) {
    var topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    var instance = PopupManager.getInstance(topPopup.id);
    return instance;
  }
};

if (!Vue.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      var topPopup = getTopPopup();

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close();
      }
    }
  });
}

export default PopupManager;