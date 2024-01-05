import WebView from 'react-native-webview';
import BackgroundView from '~/uikit/themes/background-view';
import Headers from '~/uikit/themes/header';
import {inject} from './sdk';
import usePageHooks from './hooks';

const Home = () => {
  const [{webviewRef, bridge}, {onMessage}] = usePageHooks();
  return (
    <BackgroundView style={{flex: 1}}>
      <Headers
        title="测试"
        right={{
          type: 'TEXT',
          value: '刷新',
          action: () => {
            webviewRef.current?.reload();
          },
        }}
      />
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        webviewDebuggingEnabled
        scalesPageToFit={false}
        injectedJavaScript={inject}
        injectedJavaScriptBeforeContentLoaded={bridge}
        onMessage={onMessage}
        source={{uri: 'http://172.19.8.4:9999/'}}
      />
    </BackgroundView>
  );
};

export default Home;
