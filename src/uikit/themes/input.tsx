import {FC, PropsWithChildren, useMemo} from 'react';
import {StyleSheet, TextInputProps, TextInput} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState, themeValue} from '~/recoil-state/theme';

interface IInputTextProps extends TextInputProps {
  level?: number;
}

const FontText: FC<PropsWithChildren<IInputTextProps>> = props => {
  const color = useRecoilValue(themeValue);
  const theme = useRecoilValue(themeState);
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

  return (
    <TextInput
      returnKeyType="done"
      autoCorrect={false}
      autoComplete="off"
      autoCapitalize="none"
      allowFontScaling={false}
      clearButtonMode="while-editing"
      underlineColorAndroid="transparent"
      keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
      placeholderTextColor={color.textColor3}
      {...rest}
      style={[style, textColor]}>
      {props.children}
    </TextInput>
  );
};

export default FontText;
