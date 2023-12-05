import 'react-native-devsettings'
import 'react-native-gesture-handler'
import { RootSiblingParent } from 'react-native-root-siblings'
import { RecoilRoot } from 'recoil'
import { AppRegistry } from 'react-native';
import Router from '~/router/index';
import { name as appName } from './app.json';

const App = () => {
    return (
        <RecoilRoot>
            <RootSiblingParent>
                <Router />
            </RootSiblingParent>
        </RecoilRoot>
    )
}

AppRegistry.registerComponent(appName, () => App);
