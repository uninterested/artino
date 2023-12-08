import {FC, PropsWithChildren, useMemo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
} from 'react-native-reanimated';
import {ReanimatedKeyframe} from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';

interface IFontTextProps extends TextProps {
  level?: number;
  animated?: boolean;
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

const IconFont: FC<PropsWithChildren<IFontTextProps>> = props => {
  const color = useRecoilValue(themeValue);
  const {level, style = {}, ...rest} = props;
  const flattenStyle = StyleSheet.flatten(style);
  const textColor = useMemo(() => {
    switch (level) {
      case 0:
        return {color: flattenStyle?.color || color.textColor};
      case 1:
        return {color: flattenStyle?.color || color.textColor2};
      case 2:
        return {color: flattenStyle?.color || color.textColor3};
      default:
        return {color: flattenStyle?.color || color.textColor};
    }
  }, [level, color]);

  const Comp = (
    props.entering || props.animated || props.exiting ? Animated.Text : Text
  ) as any;

  return (
    <Comp {...rest} style={[style, textColor, {fontFamily: 'iconfont'}]}>
      {props.children}
    </Comp>
  );
};

export default IconFont;
