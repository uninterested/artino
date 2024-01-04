import WebView from 'react-native-webview';
import {
  handleAbortTask,
  handleConsole,
  handleModal,
  handleRequest,
  handleToast,
} from '../handle/utils';
import {TMessage} from '../../types';

// 处理消息
export const handleMessage = (
  message: string,
  webview: WebView<{}> | null,
  options: POJO,
) => {
  try {
    const json = JSON.parse(message) as TMessage;
    switch (json.type) {
      case '_@log@_':
      case '_@error@_':
      case '_@warn@_':
        handleConsole(
          json.content,
          json.type.replace('_@', '').replace('@_', ''),
        );
      case '_@showToast@_':
      case '_@hideToast@_':
      case '_@showLoading@_':
      case '_@hideLoading@_':
        handleToast(json, webview);
        break;
      case '_@showModal@_':
        handleModal(json, webview);
        break;
      case '_@request@_':
        handleRequest(json, webview, options);
        break;
      case '_@abortTask@_':
        handleAbortTask(json);
        break;
    }
  } catch (e) {
    console.log('error: ', e);
  }
};

// pool
const fnPool = `var fnPool = {};
function invokeEvent(e) {
  var id = e.id;
  try {
    var fnInvoke = e.fnInvoke;
    for (var i = 0; i < fnInvoke.length; i++) {
      var fnName = fnInvoke[i].key;
      var value = fnInvoke[i].value
      var fn = fnPool[id][fnName]
      if (fn) {
        fn.apply(null, value);
      }
    }
  } finally {
    delete fnPool[id];
  }
};
function attachEvent(id, res, rej, arg, list) {
  fnPool[id] = {
    _res: res,
    _rej: rej
  };
  var args = arg || {};
  var lists = list || [];
  for (var i = 0; i < lists.length; i++) {
    var fnName = lists[i];
    fnPool[id][fnName] = args[fnName]
  }
};
`;
// 生成唯一标识
const uuidStr = `function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}`;
// build promise wrap
const buildPromiseStr = `function buildPromise(fn) {
  return new Promise(function (resolve, reject) {
    var id = uuid();
    fn(id, resolve, reject);
  });
}`;
// 消息桥
const postMessageStr = `function postMessage(message, targetOrigin) {
  originPostMessage(message, targetOrigin || '*');
}`;
// 构建参数
const buildArgsStr = `function buildArgs(type, message, id) {
  var key = '_@' + type + '@_';
  return JSON.stringify({
    type: key,
    content: message,
    id,
  });
}`;
// 编译方法名
const buildFnStr = `function buildFn(name) {
  return '_@' + name;
}`;

export const helper = `
${uuidStr}
${fnPool}
${buildArgsStr}
${buildFnStr}
${postMessageStr}
${buildPromiseStr}`;
