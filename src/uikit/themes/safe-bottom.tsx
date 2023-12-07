import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ISafeBottomView {
  /** 固定高度 */
  fixedHeight?: number;
}

const SafeBottomView: FC<ISafeBottomView> = props => {
  const {bottom} = useSafeAreaInsets();
  const {fixedHeight = 0} = props;
  return <View style={[styles.box, {height: fixedHeight + bottom}]} />;
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default SafeBottomView;
