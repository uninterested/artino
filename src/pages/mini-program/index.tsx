import WebView from 'react-native-webview';
import BackgroundView from '~/uikit/themes/background-view';
import Headers from '~/uikit/themes/header';
import sdk, {disableLongPress} from './sdk';
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
        scalesPageToFit={false}
        injectedJavaScript={disableLongPress}
        injectedJavaScriptBeforeContentLoaded={sdk}
        onMessage={onMessage}
        source={{uri: 'http://192.168.1.101:9999/'}}
      />
    </BackgroundView>
  );
};

export default Home;
