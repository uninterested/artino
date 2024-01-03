import {FC, PropsWithChildren, memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BounceIn,
  Extrapolation,
  FadeOutDown,
  LayoutAnimationConfig,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import style from './style';
import React from 'react';
import BackgroundView from '~/uikit/themes/background-view';
import Text from '~/uikit/themes/font-text';
import BorderView from '../themes/border';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import AnimatedView from '../themes/animated-view';
import Keyboard from '../keyboard';
import Input from '../themes/input';

interface IButtonProps {
  text: string | JSX.Element;
  color?: string;
  onPress?: (value?: string) => void;
}

export interface IModalProps {
  zIndex?: number;
  autoDismiss?: boolean;
  title?: string | JSX.Element;
  message?: string | JSX.Element;
  placeholder?: string;
  buttons: IButtonProps[];
  onClose?: () => void;
}

const Modal: FC<PropsWithChildren<IModalProps>> = props => {
  const {title, message, buttons, onClose, placeholder} = props;
  const duration: number = 200;
  const {borderColor} = useRecoilValue(themeValue);
  const [show, setShow] = useState<boolean>(false);
  const maskOpacity = useSharedValue(0);
  const [text, setText] = useState<string | undefined>(undefined);

  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      maskOpacity.value,
      [0, 1],
      [0, 0.3],
      Extrapolation.IDENTITY,
    );
    return {
      backgroundColor: `rgba(0,0,0,${opacity})`,
    };
  });

  useEffect(() => {
    maskOpacity.value = withTiming(1, {duration: duration * 0.5}, () => {
      'worklet';
      runOnJS(setShow)(true);
    });
  }, []);

  const onDismiss = () => {
    setShow(false);
    const safeClose = () => onClose?.();
    maskOpacity.value = withTiming(0, {duration: duration}, () => {
      'worklet';
      runOnJS(safeClose)();
    });
  };

  const renderH = () => {
    const btns = [];
    const len = buttons.length;
    for (let i = 0; i < len; i++) {
      const btn = buttons[i];
      if (React.isValidElement(btn)) {
        btns.push(btn);
      } else {
        btns.push(
          <TouchableOpacity
            activeOpacity={1}
            key={i}
            style={style.btnH}
            onPress={() => {
              btn.onPress?.(text);
              onDismiss();
            }}>
            <Text
              style={[
                style.btnText,
                btn.color ? {color: btn.color} : undefined,
              ]}>
              {btn.text}
            </Text>
          </TouchableOpacity>,
        );
      }
      btns.push(<BorderView key={(i + len).toString()} style={style.lineH} />);
    }
    btns.pop();
    return (
      <View
        style={[style.footer, {borderTopColor: borderColor}, style.horizontal]}>
        {btns}
      </View>
    );
  };

  const renderV = () => {
    const btns = [];
    const len = buttons.length;
    for (let i = 0; i < len; i++) {
      const btn = buttons[i];
      if (React.isValidElement(btn)) {
        btns.push(btn);
      } else {
        btns.push(
          <TouchableOpacity
            key={i.toString()}
            activeOpacity={0.9}
            style={style.btnV}
            onPress={() => {
              btn.onPress?.(text);
              onDismiss();
            }}>
            <Text
              style={[
                style.btnText,
                btn.color ? {color: btn.color} : undefined,
              ]}>
              {btn.text}
            </Text>
          </TouchableOpacity>,
        );
      }
      btns.push(<BorderView key={(i + len).toString()} style={style.lineV} />);
    }
    btns.pop();
    return (
      <View
        style={[style.footer, {borderTopColor: borderColor}, style.vertical]}>
        {btns}
      </View>
    );
  };

  return (
    <AnimatedView style={[style.mask, maskStyle]}>
      <Keyboard style={style.keyboard}>
        <LayoutAnimationConfig>
          {show ? (
            <BackgroundView
              entering={BounceIn.duration(duration).springify().damping(12)}
              exiting={FadeOutDown.duration(duration).springify()}
              style={[style.body]}>
              {title ? (
                React.isValidElement(title) ? (
                  title
                ) : (
                  <Text style={style.title}>{title}</Text>
                )
              ) : null}
              {message ? (
                React.isValidElement(message) ? (
                  message
                ) : (
                  <Text
                    level={1}
                    style={[style.message, {marginTop: !title ? 20 : 10}]}>
                    {message}
                  </Text>
                )
              ) : null}
              {placeholder ? (
                <Input
                  placeholder={placeholder}
                  value={text}
                  onChangeText={setText}
                  style={[
                    style.input,
                    {marginTop: !message ? 20 : 10, borderColor},
                  ]}
                />
              ) : null}

              {buttons.length === 2 ? renderH() : renderV()}
            </BackgroundView>
          ) : null}
        </LayoutAnimationConfig>
      </Keyboard>
    </AnimatedView>
  );
};

export default memo(Modal);
