import WebView from 'react-native-webview';
import Axios from 'axios';
import FNFetchBlob, {RNFetchBlob} from 'react-native-fetch-blob';
import instance from '~/utils/instance';
import Modal from '~/uikit/modal';
import Toast from '~/uikit/toast';
import {TMessage} from '../../types';

//#region function wrap 非紧急情况不要修改
const buildInvokeFunc = (names: string[], value: any[]) => {
  return names.map((e, i) => ({
    key: e,
    value: value[i],
  }));
};

const buildFn = (name: string | number) => {
  return '_@' + name;
};
//#endregion

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
      case '_@downloadFile@_':
        handleDownloadFile(json, webview, options);
        break;
    }
  } catch (e) {
    console.log('error: ', e);
  }
};

// 处理console
export const handleConsole = (content: TMessage[], type: string) => {
  const fn = console[type as 'log' | 'warn' | 'error'];
  fn?.(...content);
};

// 处理toast
export const handleToast = (message: TMessage, webview: WebView<{}> | null) => {
  const {content, type, id} = message;
  let event;
  if (['_@hideToast@_', '_@hideLoading@_'].includes(type)) {
    Toast.hide();
    const res = [null];
    event = {
      id,
      fnInvoke: buildInvokeFunc(
        ['_res', 'success', 'complete'],
        [res, res, res],
      ),
    };
  } else if (['_@showLoading@_', '_@showToast@_'].includes(type)) {
    if (!content) {
      const err = ['invalid options'];
      event = {
        id,
        fnInvoke: buildInvokeFunc(
          ['_rej', 'fail', 'complete'],
          [err, err, err],
        ),
      };
    } else {
      const loading = type === '_@showLoading@_';
      const map: POJO = {
        success: 'success',
        loading: 'loading',
        error: 'failed',
      };
      const key = loading
        ? 'loading'
        : ((map[content.icon] || 'text') as
            | 'success'
            | 'loading'
            | 'failed'
            | 'text');
      Toast[key]?.(content.title, loading ? 0 : content.duration);
      const res = [null];
      event = {
        id,
        fnInvoke: buildInvokeFunc(
          ['_res', 'success', 'complete'],
          [res, res, res],
        ),
      };
    }
  }
  webview?.injectJavaScript(`_··invokeEvent(${JSON.stringify(event)});`);
};

// 处理Modal
export const handleModal = (message: TMessage, webview: WebView<{}> | null) => {
  const {id, content} = message;
  let event = undefined;
  if (content.buttons.length <= 0) {
    const err = ['length of buttons must greater then 0'];
    event = {
      id,
      fnInvoke: buildInvokeFunc(['_rej', 'fail', 'complete'], [err, err, err]),
    };
  } else {
    Modal.present({
      title: content.title,
      message: content.message,
      placeholder: content.placeholder,
      buttons: content.buttons.map((e: POJO, i: number) => ({
        text: e.text,
        color: e.color,
        onPress: (value?: string) => {
          event = {
            id,
            fnInvoke: buildInvokeFunc(
              ['_res', 'success', 'complete', buildFn(i)],
              [[value], [value], [null], [value]],
            ),
          };
          webview?.injectJavaScript(
            `_··invokeEvent(${JSON.stringify(event)});`,
          );
        },
      })),
    });
  }
};

// 处理Request请求
export const handleRequest = async (
  message: TMessage,
  webview: WebView<{}> | null,
  options: POJO,
) => {
  const {id, content} = message;
  let event;
  try {
    if (!['text', 'arraybuffer'].includes(content.responseType?.toLowerCase()))
      delete content.responseType;
    if (
      ![
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
        'HEAD',
        'TRACE',
        'CONNECT',
      ].includes(content.method?.toUpperCase())
    )
      delete content.method;
    if (Object.prototype.toString.call(content.timeout) !== '[object Number]')
      delete content.timeout;
    if (!content.header) content.header = {};
    if (!content.header['content-type'])
      content.header['content-type'] = 'application/json;charset=utf-8';
    content.header.Referer = `https://service.artino.com/${options.appId}/${options.type}/page-frame.html`;
    const defaultOptions = {
      url: '',
      method: 'GET',
      data: undefined,
      timeout: 60000,
      dataType: 'json',
      responseType: 'json',
    };
    const opt = Object.assign(defaultOptions, content);
    const cancel = Axios.CancelToken.source();
    instance.set(id, cancel.cancel);
    const response = await Axios({...opt, cancelToken: cancel.token});
    event = {
      id,
      fnInvoke: buildInvokeFunc(['success', 'complete'], [[response], [null]]),
    };
  } catch (ex: any) {
    const err = [ex.message || ex];
    event = {
      id,
      fnInvoke: buildInvokeFunc(['fail', 'complete'], [err, err]),
    };
  } finally {
    instance.remove(id);
  }
  webview?.injectJavaScript(`_··invokeEvent(${JSON.stringify(event)});`);
};

// 处理下载文件
export const handleDownloadFile = async (
  message: TMessage,
  webview: WebView<{}> | null,
  options: POJO,
) => {
  const {id, content} = message;
  let event;
  try {
    if (!content.header) content.header = {};
    content.header.Referer = `https://service.artino.com/${options.appId}/${options.type}/page-frame.html`;
    if (
      !['GET', 'POST', 'PUT', 'PATCH'].includes(content.method?.toUpperCase())
    )
      delete content.method;
    let path = content.filePath;
    if (!path) {
      const sufix = content.url.split('.')[1] || '';
      path =
        RNFetchBlob.fs.dirs.CacheDir +
        `/tmp/${+new Date()}${sufix ? `.${sufix}` : sufix}`;
    }
    const response = await RNFetchBlob.config({
      path,
      fileCache: true,
    }).fetch(content.method || 'GET', content.url, {
      ...content.header,
    });
    console.log('ads: ', response);
  } catch (ex: any) {
    const err = [ex.message || ex];
    event = {
      id,
      fnInvoke: buildInvokeFunc(['fail', 'complete'], [err, err]),
    };
  } finally {
    instance.remove(id);
  }
  webview?.injectJavaScript(`_··invokeEvent(${JSON.stringify(event)});`);
};

// 处理取消任务
export const handleAbortTask = (message: TMessage) => {
  const {id} = message;
  const task = instance.get(id);
  task?.('abort task');
  instance.remove(id);
};
