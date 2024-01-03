import Toast from '~/uikit/toast';
import {TMessage} from '../types';
import WebView from 'react-native-webview';
import Modal from '~/uikit/modal';

const buildInvokeFunc = (names: string[], value: any[]) => {
  return names.map(e => ({
    key: e,
    value,
  }));
};

const buildFn = (name: string | number) => {
  return '_@' + name;
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
    event = {
      id,
      fnInvoke: buildInvokeFunc(['_res', 'success', 'complete'], [null]),
    };
  } else if (['_@showLoading@_', '_@showToast@_'].includes(type)) {
    if (!content) {
      event = {
        id,
        fnInvoke: buildInvokeFunc(
          ['_rej', 'fail', 'complete'],
          ['invalid options'],
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
      event = {
        id,
        fnInvoke: buildInvokeFunc(['_res', 'success', 'complete'], [null]),
      };
    }
  }
  webview?.injectJavaScript(`invokeEvent(${JSON.stringify(event)});`);
};

// 处理Modal
export const handleModal = (message: TMessage, webview: WebView<{}> | null) => {
  const {id, content} = message;
  let event = undefined;
  if (content.buttons.length <= 0) {
    event = {
      id,
      fnInvoke: buildInvokeFunc(
        ['_rej', 'fail', 'complete'],
        ['length of buttons must greater then 0'],
      ),
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
              [value],
            ),
          };
          webview?.injectJavaScript(`invokeEvent(${JSON.stringify(event)});`);
        },
      })),
    });
  }
};

// 处理Request请求
export const handleRequest = (
  message: TMessage,
  webview: WebView<{}> | null,
) => {
  console.log('as: ', message);
};
