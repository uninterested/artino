import {useNavigation, useRoute} from '@react-navigation/native';
import {
  IPageMethodProps,
  IPageResultProps,
  IParamsProps,
  ISeatModel,
  TSecne,
  TTransactionValue,
} from '../types';
import {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useMemo, useState} from 'react';
import {hp, wp} from '~/utils/responsive';
import {TNavigation} from '~/router/stacks';
import {useRecoilValue} from 'recoil';
import {themeState, themeValue} from '~/recoil-state/theme';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  // 黑白主题
  const state = useRecoilValue(themeState);
  // 背景色
  const {backgroundColor} = useRecoilValue(themeValue);
  // 位置
  const {position} = useRoute().params as IParamsProps;
  // 场景模式
  const [scene, setScene] = useState<TSecne>('init');
  // 透明度值
  const maskOpacity = useSharedValue(1);
  // 转场动画值
  const transactionValue = useSharedValue<TTransactionValue>(0);
  // 预定时间的场景动画
  const sceneTimeValue = useSharedValue<TTransactionValue>(0);
  // 预定座位的场景动画
  const sceneSeatValue = useSharedValue<TTransactionValue>(0);

  const seatInfo = useMemo(() => {
    const x = 5;
    const y = 8;
    const value = new Array(x).fill(0).map(() => new Array(y).fill(null));
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (Math.round(Math.random() * 10000) % 14 === 0) {
          value[i][j] = null;
        } else {
          value[i][j] = {
            status:
              Math.round(Math.random() * 10000) % 6 === 0
                ? 'selled'
                : 'available',
            key: `${i}-${j}`,
            price: 80,
            core: [3, 4].includes(x) && Math.abs(j - y * 0.5) < 2,
          } as ISeatModel;
        }
      }
    }
    return value;
  }, []);

  // 渐变色
  const colors = useMemo(() => {
    return state === 'dark'
      ? ['rgba(0, 0, 0, 0)', backgroundColor]
      : ['rgba(70, 70, 70, 0)', backgroundColor];
  }, [state]);
  // 日期配置
  const dateConfig = useMemo(() => {
    const map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return {
      year: 2023,
      month: 12,
      date: map.map((v, i) => ({
        week: v,
        day: 10 + i,
        time: new Array(5).fill(0).map((x, y) => `${10 + y * 2 + i}:00`),
      })),
    };
  }, []);

  // 选中的日期
  const [selectDay, setSelectDay] = useState<number>();
  const [selectTime, setSelectTime] = useState<string>();

  // layout config
  const openLayoutConfig = useMemo(
    () => ({duration: 400, easing: Easing.sin}),
    [],
  );
  // 场景动效配置
  const sceneConfig = useMemo(
    () => ({duration: 320, easing: Easing.linear}),
    [],
  );
  // values
  const layoutValues = useMemo(() => {
    return {
      screenWidth: wp(100),
      screenHeihgt: hp(100),
      sh80: hp(83),
      videoHeight: wp(70) * 0.55,
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
      [1, ((layoutValues.screenHeihgt * 2) / position.width) << 0, 1],
    );
    const borderRadius = interpolate(
      transactionValue.value,
      [0, 0.99, 1],
      [position.width * 0.5, position.width * 0.5, 0],
    );
    const opacity = maskOpacity.value;
    return {
      opacity,
      borderRadius,
      left,
      top,
      width,
      height,
      transform: [{scale}],
    };
  });
  // 导航栏样式
  const navigateStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(transactionValue.value, [0, 0.6, 1], [0, 0, 1]),
    };
  });

  const dateScrollStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      sceneTimeValue.value,
      [0, 1],
      [layoutValues.sh80, 0],
    );
    return {
      transform: [{translateY}],
    };
  });

  const coverStyle = useAnimatedStyle(() => {
    const opacity = interpolate(sceneSeatValue.value, [0, 1], [1, 0]);
    return {opacity};
  });

  const videoStyle = useAnimatedStyle(() => {
    const rotateY =
      interpolate(
        sceneSeatValue.value,
        [0, 1],
        [-180, 0],
        Extrapolation.IDENTITY,
      ) + 'deg';
    const scale = interpolate(sceneSeatValue.value, [0, 1, 2], [0, 1, 1]);
    const translateY = interpolate(
      sceneSeatValue.value,
      [0, 1, 2],
      [0, 0, layoutValues.videoHeight * 0.5],
    );
    const rotateX =
      interpolate(sceneSeatValue.value, [0, 1, 2], [0, 0, -44]) + 'deg';
    return {
      transform: [
        {rotateY},
        {scale},
        {perspective: 200},
        {rotateX},
        {translateY},
      ],
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sceneSeatValue.value,
      [0, 1, 1.8, 2],
      [0, 0, 1, 1],
    );
    return {
      opacity,
    };
  });

  // 更新转场值
  const onUpdateValue = (next: TTransactionValue) => {
    if (next !== transactionValue.value) {
      transactionValue.value = withTiming(next, openLayoutConfig, fin => {
        if (!fin) return;
        runOnJS(toggleDateView)(1);
      });
    }
  };

  const toggleDateView = (next: TTransactionValue) => {
    if (next === 1) {
      setScene('time');
      sceneTimeValue.value = withDelay(360, withTiming(1, sceneConfig));
    } else {
      sceneTimeValue.value = withTiming(0, sceneConfig, fin => {
        if (!fin) return;
        runOnJS(setScene)('seat');
        sceneSeatValue.value = withTiming(
          1,
          {duration: 360, easing: Easing.linear},
          fin => {
            if (!fin) return;
            sceneSeatValue.value = withDelay(100, withTiming(2, sceneConfig));
          },
        );
      });
    }
  };

  const onUpdateDay = (day: number | undefined) => {
    if (day === selectDay) return;
    setSelectDay(day);
    setSelectTime(undefined);
  };

  const onUpdateTime = (time: string | undefined) => {
    if (time === selectTime) return;
    setSelectTime(time);
  };

  // 选择座位
  const onSelectSeat = () => {};

  return [
    {
      videoStyle,
      duration: sceneConfig.duration,
      coverStyle,
      dateConfig,
      colors,
      maskStyle,
      navigateStyle,
      scene,
      dateScrollStyle,
      selectDay,
      selectTime,
      opacityStyle,
      seatInfo,
    },
    {onUpdateValue, onUpdateDay, onUpdateTime, toggleDateView, onSelectSeat},
  ];
};

export default usePageHooks;
