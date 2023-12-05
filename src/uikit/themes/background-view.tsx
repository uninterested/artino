import {FC, PropsWithChildren, useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
} from 'react-native-reanimated';
import {ReanimatedKeyframe} from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';

interface IBackgroundViewProps {
  level?: 0 | 1 | 2;
  style?: StyleProp<ViewStyle>;
  entering?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | ReanimatedKeyframe;
}

const BackgroundView: FC<PropsWithChildren<IBackgroundViewProps>> = props => {
  const color = useRecoilValue(themeValue);
  const {level = 0, style = {}, ...rest} = props;
  const flattenStyle = StyleSheet.flatten(style);

  const background = useMemo(() => {
    switch (level) {
      case 0:
        return {
          backgroundColor:
            flattenStyle?.backgroundColor || color.backgroundColor,
        };
      case 1:
        return {
          backgroundColor:
            flattenStyle?.backgroundColor || color.backgroundColor2,
        };
      case 2:
        return {
          backgroundColor:
            flattenStyle?.backgroundColor || color.backgroundColor3,
        };
      default:
        return {
          backgroundColor:
            flattenStyle?.backgroundColor || color.backgroundColor,
        };
    }
  }, [level, color]);

  const Comp = (props.entering ? Animated.View : View) as any;

  return (
    <Comp {...rest} style={[props.style, background]}>
      {props.children}
    </Comp>
  );
};

export default BackgroundView;
