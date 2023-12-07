import {useRoute} from '@react-navigation/native';
import {IPageMethodProps, IPageResultProps, TTransactionValue} from '../types';
import {IMovieModel} from '../../index/types';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useMemo} from 'react';
import {hp, wp} from '~/utils/responsive';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const {item, position} = useRoute().params as {
    item: IMovieModel;
    position: IPosition;
  };

  const transactionValue = useSharedValue<TTransactionValue>(0);
  // layout config
  const openLayoutConfig = useMemo(
    () => ({duration: 460, easing: Easing.exp}),
    [],
  );

  const layoutValues = useMemo(() => {
    return {
      screenWidth: wp(100),
      screenHeihgt: hp(100),
    };
  }, []);

  const maskStyle = useAnimatedStyle(() => {
    const left = interpolate(
      transactionValue.value,
      [0, 0.99, 1],
      [position.left, position.left, 0],
    );
    const top = interpolate(
      transactionValue.value,
      [0, 0.99, 1],
      [position.top, position.top, 0],
    );
    const width = interpolate(
      transactionValue.value,
      [0, 0.99, 1],
      [position.width, position.width, layoutValues.screenWidth],
    );
    const height = interpolate(
      transactionValue.value,
      [0, 0.99, 1],
      [position.height, position.height, layoutValues.screenHeihgt],
    );
    const scale = interpolate(
      transactionValue.value,
      [0, 0.99, 1],
      [1, ((layoutValues.screenHeihgt * 2.5) / position.width) << 0, 1],
    );
    return {
      borderRadius: position.width * 0.5,
      left,
      top,
      width,
      height,
      transform: [{scale}],
    };
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
   * 更新转场值
   * @param next
   */
  const onUpdateValue = (next: TTransactionValue) => {
    if (next !== transactionValue.value) {
      transactionValue.value = withTiming(next, openLayoutConfig);
    }
  };

  return [
    {
      maskStyle,
    },
    {onUpdateValue},
  ];
};

export default usePageHooks;
