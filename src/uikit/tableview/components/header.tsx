import React, {Component, PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {RefreshHeader, RefreshLayout} from 'react-native-refresh';
import AsyncStorage from '@react-native-community/async-storage';
import {textColor, getRefreshStr} from '../utils';

interface IRefresherProps {
  hex?: string;
  refreshing: boolean;
  statusStr?: string;
  onPullingRefresh: () => void;
  onRefresh: () => void;
  onEndRefresh: () => void;
  onIdleRefresh: () => void;
}

export default class Refresher extends Component<
  PropsWithChildren<IRefresherProps>
> {
  private rotateAni = new Animated.Value(0);
  private readonly kDuration: number = 250;
  private readonly kRefreshLastTime: string = '';
  private lastRefresh: number = 0;

  constructor(props: PropsWithChildren<IRefresherProps>) {
    super(props);
    this.kRefreshLastTime = `__@@${props.hex || 'lastrefresh'}@@__`;
  }

  async componentDidMount() {
    this.lastRefresh = Number(
      (await AsyncStorage.getItem(this.kRefreshLastTime)) || 0,
    );
    this.forceUpdate();
  }

  shouldComponentUpdate(next: IRefresherProps) {
    if (Platform.OS === 'ios') {
      return (
        next.refreshing !== this.props.refreshing ||
        next.statusStr !== this.props.statusStr
      );
    }
    return true;
  }

  /**
   * 松开立即刷新
   */
  private onPullingRefresh = () => {
    Animated.timing(this.rotateAni, {
      toValue: 180,
      duration: this.kDuration,
      useNativeDriver: true,
    }).start();
    this.props.onPullingRefresh();
  };

  /**
   * 正在刷新
   */
  private onRefresh = () => {
    this.props.onRefresh();
  };

  /**
   * 结束刷新
   */
  private onEndRefresh = () => {
    this.props.onEndRefresh();
    this.rotateAni.setValue(0);
    this.lastRefresh = +new Date();
    this.forceUpdate();
    AsyncStorage.setItem(this.kRefreshLastTime, this.lastRefresh.toString());
  };

  /**
   * 下拉刷新
   */
  private onIdleRefresh = () => {
    Animated.timing(this.rotateAni, {
      toValue: 0,
      duration: this.kDuration,
      useNativeDriver: true,
    }).start();
    this.forceUpdate();
    this.props.onIdleRefresh();
  };

  private renderArrow = () => {
    const {refreshing} = this.props;
    if (refreshing) {
      return (
        <ActivityIndicator
          animating
          hidesWhenStopped
          size={16}
          color={textColor}
        />
      );
    }
    const rotate = this.rotateAni.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <Animated.View style={[styles.arrow, {transform: [{rotate}]}]}>
        <View style={[styles.arrowV, styles.arrowVL]} />
        <View style={styles.arrowV} />
        <View style={[styles.arrowV, styles.arrowVR]} />
      </Animated.View>
    );
  };

  private renderContent = () => {
    const {statusStr} = this.props;
    return (
      <View style={styles.content}>
        <Text style={styles.tips}>{statusStr || ''}</Text>
        <Text style={[styles.tips, {marginTop: 2}]}>
          {getRefreshStr(this.lastRefresh)}
        </Text>
      </View>
    );
  };

  render() {
    const {refreshing, children} = this.props;
    return (
      <RefreshLayout
        enable
        refreshing={refreshing}
        onPullingRefresh={this.onPullingRefresh}
        onRefresh={this.onRefresh}
        onEndRefresh={this.onEndRefresh}
        onIdleRefresh={this.onIdleRefresh}>
        <RefreshHeader style={styles.container}>
          <View style={styles.leftMask}>{this.renderArrow()}</View>
          {this.renderContent()}
        </RefreshHeader>
        {children}
      </RefreshLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  arrow: {
    width: 26,
    height: 26,
    position: 'relative',
  },
  arrowV: {
    height: 18,
    width: 1.6,
    backgroundColor: textColor,
    position: 'absolute',
    top: 4,
    left: 12,
    borderRadius: 0.8,
  },
  arrowVR: {
    height: 10,
    transform: [{rotateZ: '-35deg'}, {translateX: 2.5}, {translateY: 1}],
  },
  arrowVL: {
    height: 10,
    transform: [{rotateZ: '35deg'}, {translateX: -2.5}, {translateY: 1}],
  },
  leftMask: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 5,
  },
  tips: {
    fontSize: 12,
    fontWeight: '500',
    color: textColor,
  },
});
