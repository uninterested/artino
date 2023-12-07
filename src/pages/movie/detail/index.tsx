import {memo, useEffect} from 'react';
import styles from './style';
import ReactContext from './context';
import usePageHooks from './hooks';
import BackgroundView from '~/uikit/themes/background-view';
import {useRoute} from '@react-navigation/native';
import {IMovieModel} from '../index/types';
import Animated, {
  FadeInRight,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {wp} from '~/utils/responsive';
import Text from '~/uikit/themes/font-text';
import {TouchableOpacity, View} from 'react-native';
import IconFont from '~/uikit/themes/icon-font';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';

const MovieDetail = () => {
  const {primaryColor, borderColor} = useRecoilValue(themeValue);
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
      }, 5);
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
          source={{uri: item.icon, cache: 'force-cache'}}
        />
        <Text layout={maskLayout} style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={[styles.starWrap, styles.topOffset]}>
          {new Array(5)
            .fill(0)
            .map((_, i) => (i < item.stars ? 1 : 0))
            .map((active, index) => (
              <IconFont
                key={index}
                style={[
                  styles.wrap,
                  {color: active ? primaryColor : undefined},
                ]}>
                {'\ue612'}
              </IconFont>
            ))}
        </View>
        <View style={[styles.starWrap, styles.topOffset]}>
          {item.type.map((e, i) => (
            <Text style={[styles.type, {borderColor}]} key={i}>
              {e}
            </Text>
          ))}
        </View>
        <BackgroundView style={[styles.topOffset, styles.book]}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={styles.bookText}>立即订票</Text>
          </TouchableOpacity>
        </BackgroundView>
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default memo(MovieDetail);
