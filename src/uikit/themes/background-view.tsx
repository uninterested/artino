import {FC, PropsWithChildren, forwardRef, useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import {ReanimatedKeyframe} from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';

interface IBackgroundViewProps extends ViewProps {
  level?: 0 | 1 | 2;
  style?: StyleProp<ViewStyle>;
  ref?: React.ForwardedRef<View | Animated.View>;
  layout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder;
  entering?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | ReanimatedKeyframe;
}

const BackgroundView: FC<PropsWithChildren<IBackgroundViewProps>> = forwardRef(
  (props, ref) => {
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

    const Comp = (props.entering || props.layout ? Animated.View : View) as any;

    return (
      <Comp {...rest} ref={ref} style={[props.style, background]}>
        {props.children}
      </Comp>
    );
  },
);

export default BackgroundView;
