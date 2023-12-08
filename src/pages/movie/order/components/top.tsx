import {FC, memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';
import Svg, {Defs, Ellipse, LinearGradient, Stop} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import {wp} from '~/utils/responsive';

interface IProps {
  opacityStyle: DefaultStyle;
}

const Top: FC<IProps> = props => {
  const height = 6;
  const {backgroundColor, backgroundColor3, textColor} =
    useRecoilValue(themeValue);
  return (
    <Animated.View
      style={[styles.conatiner, {height: height * 0.5}, props.opacityStyle]}>
      <Svg height={height} width={wp(70)}>
        <Ellipse
          cx={wp(70) * 0.5}
          cy={height * 0.5}
          rx={wp(70) * 0.5}
          ry={height * 0.5}
          fill="url(#grad-1)"
        />
        <Defs>
          <LinearGradient
            id="grad-1"
            x1="0"
            y1="0"
            x2={wp(70)}
            y2="0"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={backgroundColor} />
            <Stop offset="0.3" stopColor={backgroundColor3} />
            <Stop offset="0.5" stopColor={textColor} />
            <Stop offset="0.7" stopColor={backgroundColor3} />
            <Stop offset="1" stopColor={backgroundColor} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    overflow: 'hidden',
  },
});

export default memo(Top);
