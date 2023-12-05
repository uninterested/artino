import React, {Component} from 'react';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import style from './style';

export interface ISwitchProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 关闭时的背景颜色 */
  backgroundColor?: string;
  /** 开启状态时的背景颜色 */
  trackColor?: string;
  /** 当值改变的时候调用此回调函数，参数为新的值 */
  onValueChange?: (on: boolean) => void;
  /** 开关上圆形按钮的背景颜色 */
  thumbColor?: string;
  /** 表示此开关是否打开。默认为 false */
  value?: boolean;
}

class Switch extends Component<ISwitchProps> {
  constructor(props: ISwitchProps) {
    super(props);
    if (props.value) {
      this.animateOn(false);
      this.kIsOn = true;
    }
  }

  private kAnimated: Animated.Value = new Animated.Value(0);
  private kDefaultBackgroundColor: string = '#f5f5f5';
  private kDefaultTrackColor: string = '#07C160';
  private kDuration: number = 150;

  private kIsOn: boolean = false;

  componentDidUpdate(pre: ISwitchProps) {
    if (pre.value === this.props.value) return;
    if (this.props.value) this.animateOn();
    else this.animateOff();
  }

  private animateOn = (animated: boolean = true) => {
    if (this.kIsOn) return;
    this.kIsOn = true;
    Animated.timing(this.kAnimated, {
      toValue: 1,
      duration: animated ? this.kDuration : 0,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  private animateOff = () => {
    if (!this.kIsOn) return;
    this.kIsOn = false;
    Animated.timing(this.kAnimated, {
      toValue: 0,
      duration: this.kDuration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  private onPress = () => {
    this.props.onValueChange?.(!this.props.value);
  };

  render() {
    const {backgroundColor, disabled, thumbColor, trackColor} = this.props;

    const color = this.kAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [
        backgroundColor || this.kDefaultBackgroundColor,
        trackColor || this.kDefaultTrackColor,
      ],
    });

    const left = this.kAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 22],
    });

    return (
      <TouchableOpacity
        disabled={disabled}
        style={style.container}
        activeOpacity={1}
        onPress={this.onPress}>
        <Animated.View style={[style.animatedView, {backgroundColor: color}]}>
          <Animated.View
            style={[
              style.ball,
              thumbColor ? {backgroundColor: thumbColor} : undefined,
              {left},
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

export default Switch;
