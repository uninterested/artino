import React, {Component} from 'react';
import {ActivityIndicator, Animated, Image, View} from 'react-native';
import Text from '~/uikit/themes/font-text';
import style from './style';

export type TImageProps =
  | 'none'
  | 'info'
  | 'success'
  | 'failed'
  | 'loading'
  | JSX.Element;
export type TMessageProps = string | JSX.Element;

interface IToastProps {
  image: TImageProps;
  message: TMessageProps;
}

class Toast extends Component<IToastProps> {
  private alphaAni: Animated.Value = new Animated.Value(0);
  private marginTop: Animated.Value = new Animated.Value(0);
  private duration: number = 200;

  /** 显示 */
  public showWithAnimate = () => {
    Animated.parallel([
      Animated.timing(this.alphaAni, {
        toValue: 1,
        duration: this.duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.marginTop, {
        toValue: -80,
        duration: this.duration,
        useNativeDriver: false,
      }),
    ]).start();
  };

  /** 隐藏 */
  public hideWithAnimate = (cb: () => void) => {
    Animated.parallel([
      Animated.timing(this.alphaAni, {
        toValue: 0,
        duration: this.duration,
        useNativeDriver: false,
      }),
      Animated.timing(this.marginTop, {
        toValue: 0,
        duration: this.duration,
        useNativeDriver: false,
      }),
    ]).start(() => cb());
  };

  private renderImage = () => {
    const {image} = this.props;
    if (React.isValidElement(image)) return image;
    switch (image) {
      case 'loading':
        return (
          <ActivityIndicator
            animating
            color="rgba(255, 255, 255, 0.8)"
            size={40}
          />
        );
      case 'success':
        return (
          <Image style={style.icon} source={require('./assets/success.png')} />
        );
      case 'info':
        return (
          <Image style={style.icon} source={require('./assets/info.png')} />
        );
      case 'failed':
        return (
          <Image style={style.icon} source={require('./assets/failed.png')} />
        );
      default:
        return null;
    }
  };

  private renderMessage = () => {
    const {message} = this.props;
    if (React.isValidElement(message)) return message;
    return <Text style={style.message}>{message}</Text>;
  };

  private renderToast = () => {
    return (
      <Animated.View
        style={[
          style.toast,
          {
            opacity: this.alphaAni,
            marginTop: this.marginTop,
          },
        ]}>
        {this.renderImage()}
        {this.renderMessage()}
      </Animated.View>
    );
  };

  render() {
    return <View style={style.mask}>{this.renderToast()}</View>;
  }
}

export default Toast;
