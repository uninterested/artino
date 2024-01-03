import {FC, PropsWithChildren, forwardRef} from 'react';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import {ReanimatedKeyframe} from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';

interface IAnimatedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  keys?: string | number;
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

  exiting?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | ReanimatedKeyframe;
}

const AnimatedView: FC<PropsWithChildren<IAnimatedViewProps>> = forwardRef(
  (props, ref) => {
    const {style = {}, ...rest} = props;

    return (
      <Animated.View {...rest} key={props.keys} ref={ref} style={[props.style]}>
        {props.children}
      </Animated.View>
    );
  },
);

export default AnimatedView;
