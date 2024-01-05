import {useCallback, useMemo, useRef} from 'react';
import {IPageMethodProps, IPageResultProps} from '../types';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {handleMessage} from '../sdk';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import sdk from '../sdk';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const webviewRef = useRef<WebView>(null);
  const {appId, type} = useRoute().params as POJO;
  const insert = useSafeAreaInsets();

  const bridge = useMemo(() => {
    return sdk(insert);
  }, []);

  const onMessage = useCallback(
    (e: WebViewMessageEvent) => {
      const {data} = e.nativeEvent;
      handleMessage(data, webviewRef.current, {appId, type});
    },
    [webviewRef, appId, type],
  );

  return [
    {
      webviewRef,
      bridge,
    },
    {
      onMessage,
    },
  ];
};

export default usePageHooks;
