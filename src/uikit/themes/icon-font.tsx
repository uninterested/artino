import {FC, PropsWithChildren, useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';

interface IFontTextProps extends TextProps {
  level?: number;
}

const IconFont: FC<PropsWithChildren<IFontTextProps>> = props => {
  const color = useRecoilValue(themeValue);
  const {level, style, ...rest} = props;
  const textColor = useMemo(() => {
    switch (level) {
      case 0:
        return {color: color.textColor};
      case 1:
        return {color: color.textColor2};
      case 2:
        return {color: color.textColor3};
      default:
        return {color: color.textColor};
    }
  }, [level, color]);
  return (
    <Text {...rest} style={[style, textColor, {fontFamily: 'iconfont'}]}>
      {props.children}
    </Text>
  );
};

export default IconFont;
