// pool
const fnPool = `var fnPool = {};
var socketPool = {};
function _··invokeEvent(e) {
  if (!e || !e.id) return;
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
