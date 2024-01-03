import WebView from 'react-native-webview';
import BackgroundView from '~/uikit/themes/background-view';
import Headers from '~/uikit/themes/header';
import sdk, {promise} from './sdk';
import usePageHooks from './hooks';

const Home = () => {
  const [{webviewRef}, {onMessage}] = usePageHooks();
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
        injectedJavaScript={promise}
        injectedJavaScriptBeforeContentLoaded={sdk}
        onMessage={onMessage}
        source={{uri: 'http://172.19.8.4:9999/'}}
      />
    </BackgroundView>
  );
};

export default Home;
