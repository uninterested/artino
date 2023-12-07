import 'react-native-devsettings'
import 'react-native-gesture-handler'
import { RootSiblingParent } from 'react-native-root-siblings'
import { RecoilRoot } from 'recoil'
import { AppRegistry, LogBox } from 'react-native';
import Router from '~/router/index';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs(true)

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
