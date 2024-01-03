import {useCallback, useRef} from 'react';
import {IPageMethodProps, IPageResultProps} from '../types';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {handleMessage} from '../sdk';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const webviewRef = useRef<WebView>(null);

  const onMessage = useCallback(
    (e: WebViewMessageEvent) => {
      const {data} = e.nativeEvent;
      handleMessage(data, webviewRef.current);
    },
    [webviewRef],
  );

  return [
    {
      webviewRef,
    },
    {
      onMessage,
    },
  ];
};

export default usePageHooks;
