import {useMemo, useState} from 'react';
import {
  LayoutAnimationsValues,
  withTiming,
  LayoutAnimation,
  Easing,
  useSharedValue,
} from 'react-native-reanimated';
import {IPageMethodProps, IPageResultProps, TLayoutStatus} from '../types';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  // layout config
  const layoutConfig = useMemo(
    () => ({duration: 400, easing: Easing.circle}),
    [],
  );
  // 转场值
  const transactionValue = useSharedValue(0);
  // layout状态
  const [layoutStatus, setLayoutStatus] = useState<TLayoutStatus>('init');
  // mask layout
  const maskLayout = useMemo((): ((
    values: LayoutAnimationsValues,
  ) => LayoutAnimation) => {
    return (values: LayoutAnimationsValues) => {
      'worklet';
      const animations = {
        width: withTiming(values.targetWidth, layoutConfig),
        height: withTiming(values.targetHeight, layoutConfig),
        originX: withTiming(values.targetOriginX, layoutConfig),
        originY: withTiming(values.targetOriginY, layoutConfig),
        globalOriginX: withTiming(values.targetGlobalOriginX, layoutConfig),
        globalOriginY: withTiming(values.targetGlobalOriginY, layoutConfig),
      };
      const initialValues = {
        width: values.currentWidth,
        height: values.currentHeight,
        originX: values.currentOriginX,
        originY: values.currentOriginY,
        globalOriginX: values.currentGlobalOriginX,
        globalOriginY: values.currentGlobalOriginY,
      };
      return {
        initialValues,
        animations,
      };
    };
  }, []);

  // 更新layout状态
  const updateStatus = (next: TLayoutStatus) => {
    if (next === layoutStatus) return;
    setLayoutStatus(next);
    transactionValue.value = withTiming(next === 'idle' ? 1 : 0, layoutConfig);
  };

  return [{maskLayout, layoutStatus, transactionValue}, {updateStatus}];
};

export default usePageHooks;
