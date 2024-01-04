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
};
