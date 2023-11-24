import {FC, PropsWithChildren, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';

interface IBackgroundViewProps {
  level?: 0 | 1 | 2;
  style?: StyleProp<ViewStyle>;
}

const BackgroundView: FC<PropsWithChildren<IBackgroundViewProps>> = props => {
  const color = useRecoilValue(themeValue);
  const {level = 0} = props;

  const background = useMemo(() => {
    switch (level) {
      case 0:
        return {backgroundColor: color.backgroundColor};
      case 1:
        return {backgroundColor: color.backgroundColor2};
      case 2:
        return {backgroundColor: color.backgroundColor3};
      default:
        return {backgroundColor: color.backgroundColor};
    }
  }, [level, color]);

  return <View style={[props.style, background]}>{props.children}</View>;
};

export default BackgroundView;
