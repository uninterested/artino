import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FrameCallback} from 'react-native-reanimated';
import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';
import Svg, {Ellipse} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import {wp} from '~/utils/responsive';

interface IProps {
  opacityStyle: DefaultStyle;
}

const Bottom: FC<IProps> = props => {
  const height = 30;
  const {backgroundColor} = useRecoilValue(themeValue);
  return (
    <Animated.View
      style={[
        styles.container,
        {height: height * 0.5, transform: [{translateY: -0.5 * height}]},
        props.opacityStyle,
      ]}>
      <Svg height={height} width={wp(70)}>
        <Ellipse
          cx={wp(70) * 0.5}
          cy={height * 0.5}
          rx={wp(70) * 0.5}
          ry={height * 0.5}
          fill={backgroundColor}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
export default memo(Bottom);
