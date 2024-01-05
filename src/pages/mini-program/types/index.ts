import WebView, {WebViewMessageEvent} from 'react-native-webview';

export interface IPageResultProps {
  webviewRef: React.RefObject<WebView<{}>>;
  bridge: string;
}
export interface IPageMethodProps {
  onMessage: NoopT<WebViewMessageEvent>;
}

export type TArgsType =
  // network
  | 'request'
  | 'abortTask'
  | 'downloadFile'
  | 'uploadFile'
  | 'socket'
  // debug
  | 'log'
  | 'error'
  | 'warn'
  // toast
  | 'showToast'
  | 'hideToast'
  | 'showLoading'
  | 'hideLoading'
  | 'showModal';

export interface TMessage {
  type: `_@${TArgsType}@_`;
  id: string;
  content: any;
}
