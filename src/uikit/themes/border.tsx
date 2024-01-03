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

interface IBorderViewProps extends ViewProps {
  keys?: string | number;
  style?: StyleProp<ViewStyle>;
  ref?: React.ForwardedRef<View>;
}

const BorderView: FC<PropsWithChildren<IBorderViewProps>> = forwardRef(
  (props, ref) => {
    const color = useRecoilValue(themeValue);
    const {style = {}, ...rest} = props;

    return (
      <View
        {...rest}
        key={props.keys}
        ref={ref}
        style={[props.style, {backgroundColor: color.borderColor}]}>
        {props.children}
      </View>
    );
  },
);

export default BorderView;
