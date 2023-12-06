import {memo, useEffect} from 'react';
import styles from './style';
import ReactContext from './context';
import usePageHooks from './hooks';
import BackgroundView from '~/uikit/themes/background-view';
import {useRoute} from '@react-navigation/native';
import {IMovieModel} from '../index/types';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {wp} from '~/utils/responsive';

const MovieDetail = () => {
  const hooks = usePageHooks();
  const router = useRoute();
  const {position, id, item} = router.params as {
    id: string;
    position?: IPosition;
    item: IMovieModel;
  };
  const screenWidth = wp(100);
  const width = position?.width ?? 0;
  const round = width / 2;
  const offsetXY = 20;
  const iconWH = width - offsetXY * 2;

  const [{layoutStatus, maskLayout, transactionValue}, {updateStatus}] = hooks;

  useEffect(() => {
    requestAnimationFrame(() => {
      updateStatus('init');
      setTimeout(() => {
        updateStatus('idle');
      }, 10);
    });
  }, []);

  const maskBorderRadius = useAnimatedStyle(() => {
    const radius = interpolate(transactionValue.value, [0, 1], [round, 0]);
    return {borderRadius: radius};
  });

  const avatarRadius = useAnimatedStyle(() => {
    const radius = interpolate(transactionValue.value, [0, 1], [iconWH / 2, 0]);
    return {borderRadius: radius};
  });

  const isClose = ['init', 'destory'].includes(layoutStatus);

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView
        layout={maskLayout}
        level={2}
        style={[
          isClose
            ? {
                ...styles.container,
                ...position,
              }
            : styles.clear,
          styles.alignCenter,
          maskBorderRadius,
        ]}>
        <Animated.Image
          layout={maskLayout}
          style={[
            isClose
              ? {
                  width: iconWH,
                  height: iconWH,
                }
              : {
                  width: screenWidth,
                  height: screenWidth,
                },
            avatarRadius,
            styles.iconWrap,
          ]}
          resizeMode="cover"
          source={{uri: item.icon}}
        />
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default memo(MovieDetail);
