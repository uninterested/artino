import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageURISource,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Text from '~/uikit/themes/font-text';
import IconFont from '~/uikit/themes/icon-font';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import {TNavigation} from '~/router/stacks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

declare interface IButtonProps {
  type: 'ICON' | 'TEXT' | 'IMAGE';
  value: string;
  color?: string;
  action?: Noop;
}

export interface IHeadersProps {
  barStyle?: StyleProp<ViewStyle>;
  animated?: boolean;
  left?: IButtonProps | boolean;
  title?: string | React.JSX.Element;
  right?: IButtonProps;
  transparent?: boolean;
  border?: boolean;
}

const Headers: React.FC<IHeadersProps> = props => {
  const {borderColor} = useRecoilValue(themeValue);
  const navigation = useNavigation() as TNavigation;
  const {top} = useSafeAreaInsets();
  const onLeftClick = () => {
    const {left = true} = props;
    if (!left) return;
    if (left === true || !left.action) navigation.pop();
    else left.action();
  };

  const onRightClick = () => {
    const {right} = props;
    if (right?.action) right.action();
  };

  const renderLeft = () => {
    const {left = true} = props;
    if (!left) return null;
    let elem: null | React.ReactNode = null;
    if (left === true) {
      elem = <IconFont style={style.btnIcon}>{`\ue60d`}</IconFont>;
    } else if (left.type === 'TEXT') {
      elem = (
        <Text style={[style.btnText, {color: left.color || undefined}]}>
          {left.value}
        </Text>
      );
    } else if (left.type === 'ICON') {
      elem = (
        <IconFont style={[style.btnIcon, {color: left.color || undefined}]}>
          {left.value}
        </IconFont>
      );
    } else {
      elem = (
        <Image
          style={style.btnImage}
          source={left.value as ImageURISource}></Image>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[style.btn, style.btnLeft]}
        onPress={onLeftClick}>
        {elem}
      </TouchableOpacity>
    );
  };

  const renderRight = () => {
    const {right} = props;
    if (!right) return null;
    let elem: null | React.ReactNode = null;
    if (right.type === 'TEXT') {
      elem = (
        <Text style={[style.btnText, {color: right.color || undefined}]}>
          {right.value}
        </Text>
      );
    } else if (right.type === 'ICON') {
      elem = (
        <IconFont style={[style.btnIcon, {color: right.color || undefined}]}>
          {right.value}
        </IconFont>
      );
    } else {
      elem = (
        <Image style={style.btnImage} source={right.value as ImageURISource} />
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[style.btn, style.btnRight]}
        onPress={onRightClick}>
        {elem}
      </TouchableOpacity>
    );
  };

  const renderTitle = () => {
    const {title} = props;
    if (!title) return;
    if (React.isValidElement(title)) {
      return <View style={style.headerView}>{title}</View>;
    }
    return (
      <Text numberOfLines={1} style={[style.title, {color: undefined}]}>
        {title as string}
      </Text>
    );
  };

  const {border = true} = props;

  const Comp = props.animated ? Animated.View : View;

  return (
    <Comp
      style={[
        style.header,
        {height: top + 44},
        border
          ? {
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
            }
          : {
              borderBottomWidth: 0,
            },
        props.transparent
          ? {
              ...style.fixed,
            }
          : undefined,
        props.barStyle,
      ]}>
      {renderLeft()}
      {renderTitle()}
      {renderRight()}
    </Comp>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  fixed: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 9999,
  },
  btn: {
    height: 44,
    width: 56,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  btnLeft: {
    left: 15,
    alignItems: 'flex-start',
  },
  btnRight: {
    right: 15,
    alignItems: 'flex-end',
  },
  btnIcon: {
    fontSize: 22,
  },
  btnText: {
    fontSize: 14,
  },
  btnImage: {
    width: 20,
    height: 20,
  },
  headerView: {
    position: 'absolute',
    left: 66,
    right: 66,
    height: 44,
    lineHeight: 44,
    bottom: 0,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    position: 'absolute',
    left: 75,
    right: 75,
    height: 44,
    lineHeight: 44,
    bottom: 0,
  },
});

export default Headers;
