import {useCallback, useMemo, useState} from 'react';
import {
  withTiming,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import {IPageMethodProps, IPageResultProps, TLayoutStatus} from '../types';
import {hp, wp} from '~/utils/responsive';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TNavigation} from '~/router/stacks';
import {throttle} from 'lodash';
import {KButtonHeight} from '../../config';
import {IMovieModel} from '../../index/types';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation() as TNavigation;

  const {position, item} = useRoute().params as {
    item: IMovieModel;
    position: IPosition;
  };
  const layoutValue = useMemo(() => {
    const screenWidth = wp(100);
    const screenheight = hp(100);
    const width = position.width ?? 0;
    const round = width / 2;
    const offsetXY = 20;
    const iconWH = width - offsetXY * 2;
    const middleX = (screenWidth - KButtonHeight) * 0.5;
    return {
      screenWidth,
      screenheight,
      width,
      round,
      offsetXY,
      iconWH,
      middleX,
    };
  }, []);

  const maskOpacity = useSharedValue(1);

  // layout config
  const layoutConfig = useMemo(() => ({duration: 360, easing: Easing.exp}), []);
  // 转场值
  const transactionValue = useSharedValue<TLayoutStatus>(0);
  // 布局状态
  const [layoutStatus, setLayoutStatus] = useState<TLayoutStatus>(0);
  // 订票按钮
  const bookSharedValue = useSharedValue(0);

  // 更新layout状态
  const updateStatus = (next: TLayoutStatus) => {
    if (layoutStatus !== next && next === 0) setLayoutStatus(next);
    if (transactionValue.value !== next) {
      transactionValue.value = withTiming(next, layoutConfig, finished => {
        if (!finished) return;
        if (next === 1) {
          // 当next为1的时候，说明需要将详情显示出来
          runOnJS(setLayoutStatus)(next);
        } else {
          // 当next为0的时候，说明需要将蒙层先隐藏，然后在pop
          maskOpacity.value = withTiming(0, {duration: 0}, fin => {
            if (!fin) return;
            runOnJS(navigation.pop)();
          });
        }
      });
    }
  };

  /**
   * 立即订票
   */
  const onBooking = useCallback(
    throttle(
      () => {
        const action = () =>
          navigation.navigate('MovieOrder', {
            animated: false,
            item,
            position: {
              left: layoutValue.middleX,
              top: hp(100) - bottom - 10 - KButtonHeight,
              width: KButtonHeight,
              height: KButtonHeight,
            },
          });
        bookSharedValue.value = withTiming(1, layoutConfig, () => {
          'worklet';
          runOnJS(action)();
          bookSharedValue.value = withDelay(1000, withTiming(0, layoutConfig));
        });
      },
      300,
      {leading: true, trailing: false},
    ),
    [],
  );

  /**
   * 最外面的视图的样式
   */
  const maskStyle = useAnimatedStyle(() => {
    const radius = interpolate(
      transactionValue.value,
      [0, 1],
      [layoutValue.round, 0],
    );
    const left = interpolate(
      transactionValue.value,
      [0, 1],
      [position.left, 0],
    );
    const top = interpolate(transactionValue.value, [0, 1], [position.top, 0]);
    const width = interpolate(
      transactionValue.value,
      [0, 1],
      [position.width, layoutValue.screenWidth],
    );
    const height = interpolate(
      transactionValue.value,
      [0, 1],
      [position.height, layoutValue.screenheight],
    );
    const padding = interpolate(
      transactionValue.value,
      [0, 1],
      [layoutValue.offsetXY, 0],
    );

    const opacity = maskOpacity.value;
    return {
      borderRadius: radius,
      left,
      top,
      width,
      height,
      padding: padding,
      paddingBottom: 0,
      opacity,
    };
  });

  /**
   * 主图样式
   */
  const iconStyle = useAnimatedStyle(() => {
    const radius = interpolate(
      transactionValue.value,
      [0, 1],
      [layoutValue.iconWH / 2, 0],
    );
    const wh = interpolate(
      transactionValue.value,
      [0, 1],
      [layoutValue.iconWH, layoutValue.screenWidth],
    );
    return {borderRadius: radius, width: wh, height: wh};
  });

  /**
   * 预定按钮的样式
   */
  const bookStyle = useAnimatedStyle(() => {
    const offsetH = interpolate(
      bookSharedValue.value,
      [0, 1],
      [layoutValue.offsetXY * 1.5, layoutValue.middleX],
    );
    const offsetB = interpolate(
      transactionValue.value,
      [0, 1],
      [0, bottom + 10],
    );
    return {left: offsetH, right: offsetH, bottom: offsetB};
  });

  /**
   * 导航栏样式
   */
  const navigateStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(transactionValue.value, [0, 0.6, 1], [0, 0, 1]),
    };
  });

  /**
   * 立即预定文字样式
   */
  const bookTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(bookSharedValue.value, [0, 0.7, 1], [1, 0, 0]);
    return {opacity};
  });

  return [
    {
      layoutStatus,
      maskStyle,
      iconStyle,
      bookStyle,
      navigateStyle,
      bookTextStyle,
      layoutDuration: layoutConfig.duration,
    },
    {updateStatus, onBooking},
  ];
};

export default usePageHooks;
