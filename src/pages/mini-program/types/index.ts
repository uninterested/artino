import WebView, {WebViewMessageEvent} from 'react-native-webview';

export interface IPageResultProps {
  webviewRef: React.RefObject<WebView<{}>>;
}
export interface IPageMethodProps {
  onMessage: NoopT<WebViewMessageEvent>;
}

export type TArgsType =
  | 'request'
  | 'abortTask'
  | 'log'
  | 'error'
  | 'warn'
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
