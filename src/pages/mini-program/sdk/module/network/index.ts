// @ts-nocheck
export default {
  request: function (options) {
    var id = uuid();
    attachEvent(id, undefined, undefined, options, [
      'success',
      'fail',
      'complete',
    ]);
    postMessage(buildArgs('request', options, id));
    return {
      abort: function () {
        postMessage(buildArgs('abortTask', {id: id}, id));
      },
    };
  },
  downloadFile: function (options) {
    var id = uuid();
    attachEvent(id, undefined, undefined, options, [
      'success',
      'fail',
      'complete',
      'onProgress',
    ]);
    postMessage(buildArgs('downloadFile', options, id));
    return {
      abort: function () {
        postMessage(buildArgs('abortTask', {id: id}, id));
      },
    };
  },
  uploadFile: function (options) {
    var id = uuid();
    attachEvent(id, undefined, undefined, options, [
      'success',
      'fail',
      'complete',
      'onProgress',
    ]);
    postMessage(buildArgs('uploadFile', options, id));
    return {
      abort: function () {
        postMessage(buildArgs('abortTask', {id: id}, id));
      },
    };
  },
  connectSocket: function (options) {
    var id = uuid();
    attachEvent(id, undefined, undefined, options, [
      'success',
      'fail',
      'complete',
    ]);
    var obj = {};
    obj[buildFn('type')] = 'connect';
    postMessage(buildArgs('socket', Object.assign(obj, options), id));
    socketPool[id] = {};
    return {
      close: () => {
        var param = {};
        param[buildFn('type')] = 'close';
        postMessage(buildArgs('socket', Object.assign(param, {id: id}), id));
      },
      send: args => {
        var param = {};
        param[buildFn('type')] = 'send';
        postMessage(
          buildArgs('socket', Object.assign(param, {id: id}, {args: args}), id),
        );
      },
      onOpen: listener => (socketPool[id]['onOpen'] = listener),
      onMessage: listener => (socketPool[id]['onMessage'] = listener),
      onClose: listener => (socketPool[id]['onClose'] = listener),
      onError: listener => (socketPool[id]['onError'] = listener),
    };
  },
};
