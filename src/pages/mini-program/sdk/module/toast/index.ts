// @ts-nocheck
// enableAlertBeforeUnload
// disableAlertBeforeUnload
export default {
  showToast: function (options) {
    return buildPromise(function (id, res, rej) {
      attachEvent(id, res, rej, options, ['success', 'fail', 'complete']);
      postMessage(buildArgs('showToast', options, id));
    });
  },
  hideToast: function (options) {
    return buildPromise(function (id, res, rej) {
      attachEvent(id, res, rej, options, ['success', 'fail', 'complete']);
      postMessage(buildArgs('hideToast', options, id));
    });
  },
  showLoading: function (options) {
    return buildPromise(function (id, res, rej) {
      attachEvent(id, res, rej, options, ['success', 'fail', 'complete']);
      postMessage(buildArgs('showLoading', options, id));
    });
  },
  hideLoading: function (options) {
    return buildPromise(function (id, res, rej) {
      attachEvent(id, res, rej, options, ['success', 'fail', 'complete']);
      postMessage(buildArgs('hideLoading', options, id));
    });
  },
  showModal: function (options) {
    return buildPromise(function (id, res, rej) {
      var next = Object.create(options);
      var buttons = options.buttons || [];
      var fnList = ['success', 'fail', 'complete'];
      for (var i = 0; i < buttons.length; i++) {
        var fnName = buildFn(i);
        fnList.push(fnName);
        next[fnName] = buttons[i].onPress;
      }
      attachEvent(id, res, rej, next, fnList);
      postMessage(buildArgs('showModal', options, id));
    });
  },
};
