import {FC, PropsWithChildren, useMemo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import {ReanimatedKeyframe} from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';

interface IFontTextProps extends TextProps {
  level?: number;
  animated?: boolean;
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

const FontText: FC<PropsWithChildren<IFontTextProps>> = props => {
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
    props.entering || props.layout || props.animated ? Animated.Text : Text
  ) as any;

  return (
    <Comp {...rest} style={[style, textColor]}>
      {props.children}
    </Comp>
  );
};

export default FontText;
