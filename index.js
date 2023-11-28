import 'react-native-devsettings'
import 'react-native-gesture-handler'
import { RecoilRoot } from 'recoil'
import { AppRegistry } from 'react-native';
import Router from '~/router/index';
import { name as appName } from './app.json';

const App = () => {
    return (
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    )
}

AppRegistry.registerComponent(appName, () => App);
