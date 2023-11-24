import {useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import {TNavigation, TRouter} from '~/router/stacks';

const Main = () => {
  const s = useRoute() as TRouter;
  const k = useNavigation() as TNavigation;
  k.navigate('Home');
  // s.params
  console.log('asd: ', s);
  return <View></View>;
};
export default Main;
