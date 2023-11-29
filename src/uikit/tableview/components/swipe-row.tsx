import React, {Component, PropsWithChildren, Ref} from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

type TDirectionType = 'left' | 'right';

interface IActionLayoutProps {
  left: number[];
  right: number[];
}

interface IActionPosotionProps {
  left: Animated.Value[];
  right: Animated.Value[];
}

interface IActionRefProps {
  left: Ref<typeof View>[];
  right: Ref<typeof View>[];
}

interface IActionWrapValues {
  left: Animated.Value[];
  right: Animated.Value[];
}

// 阻力
const MAX_VELOCITY_CONTRIBUTION = 5;
// 动画时长
const ANIMATE_DURATION = 100;
// 打开动画时长
const OPEN_ANIMATE_DURATION = 250;

interface ISwiperRowProps {
  /** 自动关闭 */
  autoClose?: boolean;
  /** 触发侧滑的阈值 */
  triggerThreshold?: number;
  /** 自动关闭触发阈值 */
  invokeThreshold?: number;
  /** 设置父列表是否可以滚动 */
  setScrollEnabled?: (enabled: boolean) => void;
  /** 开始侧滑 */
  swipeGestureBegan?: Noop;
  /** 渲染左侧的Action按钮 */
  renderLeftAction?: () => Element[];
  /** 渲染右侧的Action按钮 */
  renderRightAction?: () => Element[];
}

interface ISwiperRowState {}

export default class SwipeRow extends Component<
  PropsWithChildren<ISwiperRowProps>,
  ISwiperRowState
> {
  constructor(props: ISwiperRowProps) {
    super(props);
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderRelease,
      onPanResponderTerminate: this._onPanResponderTerminate,
      onShouldBlockNativeResponder: () => false,
    });
    this.listener = this._translateX.addListener(({value}) => {
      this.currentTranslateX = value;
    });
  }

  // 是否打开着
  private isOpening: boolean = false;
  // listener
  private listener: string;
  // 手势
  private _panResponder: PanResponderInstance;
  // 横向滑动的距离
  private _translateX = new Animated.Value(0);
  // 横向滚动的手势是否执行了
  private horizontalSwipeGestureBegan: boolean = false;
  // 父列表是否可以滚动
  private parentScrollEnabled: boolean = true;
  // 初始滚动的位置
  private swipeInitialX: number | null = null;
  // 当前的位置
  private currentTranslateX: number = 0;
  // 按钮layout
  private actionLayout: IActionLayoutProps = {
    left: [],
    right: [],
  };
  // 按钮偏移位置
  private actionPositionValue: IActionPosotionProps = {
    left: [],
    right: [],
  };
  // 按钮Ref
  private actionRef: IActionWrapValues = {
    left: [],
    right: [],
  };
  // 是否超出距离，开始启用阻力
  private startVELOCITY: boolean = false;

  componentWillUnmount(): void {
    this._translateX.removeListener(this.listener);
  }

  _onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    gs: PanResponderGestureState,
  ) => {
    const {dx, dy} = gs;
    const {triggerThreshold = 2} = this.props;
    const invoke = Math.abs(dx) > triggerThreshold;
    if (!invoke) {
      if (Math.abs(dy) > triggerThreshold) {
        this.props.swipeGestureBegan?.();
      }
    }
    return invoke;
  };

  _onPanResponderMove = (
    e: GestureResponderEvent,
    gs: PanResponderGestureState,
  ) => {
    const {dx, dy} = gs;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const {triggerThreshold = 2} = this.props;
    if (absDx > triggerThreshold || absDy > triggerThreshold) {
      if (absDy > absDx && !this.horizontalSwipeGestureBegan) return;
      if (this.parentScrollEnabled) {
        this.parentScrollEnabled = false;
        this.props.setScrollEnabled?.(false);
      }
      if (this.swipeInitialX === null) {
        this.swipeInitialX = this.currentTranslateX;
      }
      if (!this.horizontalSwipeGestureBegan) {
        this.horizontalSwipeGestureBegan = true;
        this.props.swipeGestureBegan?.();
      }
      let newDX = this.swipeInitialX + dx;
      if (!this.props.renderLeftAction && newDX > 0) newDX = 0;
      if (!this.props.renderRightAction && newDX < 0) newDX = 0;
      if (newDX === 0) {
        this._translateX.setValue(newDX);
        return;
      } else if (newDX > 0) {
        const leftDistance = this._getSum(this.actionLayout.left);
        if (Math.abs(newDX) > leftDistance) {
          this.startVELOCITY = true;
          newDX =
            (leftDistance +
              (newDX - leftDistance) / MAX_VELOCITY_CONTRIBUTION) <<
            0;
        } else {
          this.startVELOCITY = false;
        }
      } else {
        const rightDistance = this._getSum(this.actionLayout.right);
        const absDx = Math.abs(newDX);
        if (absDx > rightDistance) {
          this.startVELOCITY = true;
          newDX =
            (rightDistance +
              (absDx - rightDistance) / MAX_VELOCITY_CONTRIBUTION) <<
            0;
          newDX *= -1;
        } else {
          this.startVELOCITY = false;
        }
      }
      this._translateX.setValue(newDX);
      this._invokeActionMove(newDX);
    }
  };

  _onPanResponderRelease = (
    e: GestureResponderEvent,
    gs: PanResponderGestureState,
  ) => {
    this._onPanResponderTerminate(e, gs);
  };

  _onPanResponderTerminate = (
    e: GestureResponderEvent,
    gs: PanResponderGestureState,
  ) => {
    if (!this.parentScrollEnabled) {
      this.parentScrollEnabled = true;
      this.props.setScrollEnabled?.(true);
    }
    const direction = this.currentTranslateX > 0 ? 'left' : 'right'; // 手势起始方向
    const {dx} = gs;
    const moveDirection = dx > 0 ? 'right' : 'left';
    const absDx = Math.abs(dx);
    const originDx = dx + (this.swipeInitialX || 0);
    const {invokeThreshold = 50} = this.props;
    const shouldClose =
      (originDx > 0 && !this.props.renderLeftAction) ||
      (originDx < 0 && !this.props.renderRightAction) ||
      (moveDirection === 'right' &&
        absDx > invokeThreshold &&
        (this.swipeInitialX || 0) < 0) ||
      (moveDirection === 'right' &&
        absDx < invokeThreshold &&
        (this.swipeInitialX || 0) <= 0) ||
      (moveDirection === 'left' &&
        absDx > invokeThreshold &&
        (this.swipeInitialX || 0) > 0) ||
      (moveDirection === 'left' &&
        absDx < invokeThreshold &&
        (this.swipeInitialX || 0) >= 0);
    if (shouldClose) {
      // 禁止左滑
      this._setActionPosition(true, direction);
    } else {
      this._setActionPosition(false, direction);
    }
    this.swipeInitialX = null;
  };

  _setActionPosition = (
    close: boolean,
    direction: TDirectionType,
    duration: number = ANIMATE_DURATION,
  ) => {
    if (close) {
      // 关闭
      Animated.parallel([
        ...this.actionPositionValue[direction].map((val, i) =>
          Animated.timing(val, {
            toValue: -1 * this.actionLayout[direction][i],
            duration: duration,
            useNativeDriver: false,
          }),
        ),
        ...this.actionRef[direction].map((val, i) => {
          return Animated.timing(val, {
            toValue: this.actionLayout[direction][i],
            duration: duration,
            useNativeDriver: false,
          });
        }),
        Animated.timing(this._translateX, {
          toValue: 0,
          duration: duration,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      const isLeft = direction === 'left';
      const distance =
        this._getSum(this.actionLayout[direction]) * (isLeft ? 1 : -1);
      // 开启
      Animated.parallel([
        ...this.actionPositionValue[direction].map((val, i) => {
          const args = isLeft ? [0, i] : [i + 1];
          return Animated.timing(val, {
            toValue: this._getSum(this.actionLayout[direction].slice(...args)),
            duration: OPEN_ANIMATE_DURATION,
            useNativeDriver: false,
          });
        }),
        ...this.actionRef[direction].map((val, i) => {
          return Animated.timing(val, {
            toValue: this.actionLayout[direction][i],
            duration: OPEN_ANIMATE_DURATION,
            useNativeDriver: false,
          });
        }),
        Animated.timing(this._translateX, {
          toValue: distance,
          duration: OPEN_ANIMATE_DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    }
    this.isOpening = !close;
    if (!this.isOpening) this.horizontalSwipeGestureBegan = false;
  };

  _onActionLayout = (
    e: LayoutChangeEvent,
    i: number,
    position: TDirectionType,
  ) => {
    let {
      layout: {width},
    } = e.nativeEvent;
    if (undefined === this.actionLayout[position][i] && !this.startVELOCITY) {
      width += 10;
      this.actionLayout[position][i] = width;
      this.actionPositionValue[position][i].setValue(-width);
      this.actionRef[position][i].setValue(width);
    }
  };

  _setUpPosition = (position: TDirectionType, len: number) => {
    if (this.actionPositionValue[position].length !== len) {
      this.actionRef[position] = new Array(len)
        .fill(0)
        .map(() => new Animated.Value(-1));
      this.actionPositionValue[position] = new Array(len)
        .fill(0)
        .map(() => new Animated.Value(0));
    }
  };

  _renderAction = (position: TDirectionType) => {
    const isLeft = position === 'left';
    if (isLeft) {
      if (!this.props.renderLeftAction) return null;
    } else {
      if (!this.props.renderRightAction) return null;
    }
    const actions = isLeft
      ? this.props.renderLeftAction?.()
      : this.props.renderRightAction?.();
    const len = actions?.length ?? 0;
    this._setUpPosition(position, len);
    return React.Children.map(actions, (child, index) => {
      const {style, onPress, ...rest} = child!.props;
      const {backgroundColor, ...rest2} = style || {};
      return React.createElement(
        Animated.View,
        {
          style: [
            isLeft ? styles.leftButton : styles.rightButton,
            isLeft
              ? {
                  left: this.actionPositionValue[position][index],
                }
              : {right: this.actionPositionValue[position][index]},
            {
              width: this.actionRef[position][index],
              zIndex: isLeft ? len - index : index,
              backgroundColor,
            },
          ],
        },
        React.cloneElement(child!, {
          ...rest,
          style: rest2,
          onPress: (e: GestureResponderEvent) => {
            onPress?.(e);
            const {autoClose = true} = this.props;
            if (autoClose) this.safeClose();
          },
          onLayout: (e: LayoutChangeEvent) =>
            this._onActionLayout(e, index, position),
        }),
      );
    });
  };

  _getSum = (list: number[]) => {
    return list.reduce((pre, next) => pre + (next || 0), 0);
  };

  _getValue = (val: number) => {
    return ((val * 100) << 0) / 100;
  };

  _invokeActionMove = (x: number) => {
    const fullWidth = this._getSum(
      this.actionLayout[x <= 0 ? 'right' : 'left'],
    );
    const originPercent = x / fullWidth;
    const percent = Math.abs(originPercent);
    if (x < 0) {
      // 向左滑动
      this.actionPositionValue.right.forEach((value, i) => {
        const moveDistance = this._getSum(this.actionLayout.right.slice(i));
        const ref = this.actionRef.right[i];
        if (percent > 1) {
          const selfDistance = this._getSum(
            this.actionLayout.right.slice(i + 1),
          );
          value.setValue(this._getValue(selfDistance * percent));
          ref.setValue(
            this._getValue(
              this.actionLayout.right[i] * ((percent - 1) * 2 + 1),
            ),
          );
        } else {
          const distance = this._getValue(
            -1 * this.actionLayout.right[i] + percent * moveDistance,
          );
          value.setValue(distance);
          ref.setValue(this._getValue(this.actionLayout.right[i]));
        }
      });
    } else {
      // 向右滑动
      this.actionPositionValue.left.forEach((value, i) => {
        const moveDistance = this._getSum(
          this.actionLayout.left.slice(0, i + 1),
        );
        const ref = this.actionRef.left[i];
        if (percent > 1) {
          const selfDistance = this._getSum(this.actionLayout.left.slice(0, i));
          value.setValue(this._getValue(selfDistance * percent));
          ref.setValue(
            this._getValue(this.actionLayout.left[i] * ((percent - 1) * 2 + 1)),
          );
        } else {
          const distance = this._getValue(
            -1 * this.actionLayout.left[i] + percent * moveDistance,
          );
          value.setValue(distance);
          ref.setValue(this._getValue(this.actionLayout.left[i]));
        }
      });
    }
  };

  public safeClose = () => {
    if (!this.isOpening) return;
    this.isOpening = true;
    const direction = this.currentTranslateX > 0 ? 'left' : 'right'; // 手势起始方向
    this._setActionPosition(true, direction, OPEN_ANIMATE_DURATION);
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderAction('left')}
        <Animated.View
          {...this._panResponder.panHandlers}
          style={{
            zIndex: 99,
            transform: [{translateX: this._translateX}],
          }}>
          {this.props.children}
        </Animated.View>
        {this._renderAction('right')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
    height: 50,
  },
  leftButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
  },
});
