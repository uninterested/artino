import {memo, useCallback, useEffect} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ReactContext from './context';
import usePageHooks from './hooks';
import styles from './style';
import Header from '~/uikit/themes/header';
import Text from '~/uikit/themes/font-text';
import BackgroundView from '~/uikit/themes/background-view';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  interpolate,
} from 'react-native-reanimated';
import {isEmpty} from 'lodash';
import {wp} from '~/utils/responsive';
import {TouchableOpacity, View} from 'react-native';
import {IMovieModel} from './types';
import IconFont from '~/uikit/themes/icon-font';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import FastImage from 'react-native-fast-image';

const Movie = () => {
  const {primaryColor, borderColor} = useRecoilValue(themeValue);
  const hooks = usePageHooks();
  const [{data}, {mockData}] = hooks;
  const itemWidth = wp(50);
  const itemHeight = wp(90);

  const centerOffset = wp(25);
  const offsetX = wp(15);

  useEffect(() => {
    mockData();
  }, []);

  const animationStyle = useCallback(
    (value: number) => {
      'worklet';

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2, 3],
        [offsetX * -2, -offsetX, 0, 0, 0, offsetX, offsetX * 2],
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemWidth * 1.2, 0, itemWidth * 1.2]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [65, 25, 20, 25, 65],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.8, 0.85, 1.1, 0.85, 0.8],
      );

      return {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          {scale},
        ],
      };
    },
    [centerOffset],
  );

  const stars = (count: number) => {
    const star = new Array(5).fill(0).map((_, i) => (i < count ? 1 : 0));
    return star;
  };

  const renderItem = useCallback((index: number, item: IMovieModel) => {
    return (
      <BackgroundView
        entering={FadeInDown.delay((index + 1) * 150).springify()}
        level={2}
        style={styles.card}
        key={item.id}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.container, styles.box]}>
          <FastImage
            source={{uri: item.icon}}
            style={styles.icon}
            resizeMode="cover"
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={[styles.starWrap, styles.topOffset]}>
            {stars(item.stars).map((active, index) => (
              <IconFont
                key={index}
                style={[
                  styles.wrap,
                  {color: active ? primaryColor : undefined},
                ]}
                entering={FadeInRight.delay(100 * index)
                  .springify()
                  .damping(7)}>
                {'\ue612'}
              </IconFont>
            ))}
          </View>
          <Animated.View
            entering={FadeInDown.delay(100).springify().damping(12)}
            style={[styles.starWrap, styles.topOffset]}>
            {item.type.map((e, i) => (
              <Text style={[styles.type, {borderColor}]} key={i}>
                {e}
              </Text>
            ))}
          </Animated.View>
          <BackgroundView
            entering={FadeInDown.delay(100).springify().damping(8)}
            style={[styles.topOffset, styles.book]}>
            <Text style={styles.bookText}>立即订票</Text>
          </BackgroundView>
        </TouchableOpacity>
      </BackgroundView>
    );
  }, []);

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView style={styles.container}>
        <Header left transparent border={false} />
        {!data?.length ? null : (
          <View style={[styles.container, styles.center]}>
            {data.map(item => (
              <Animated.Image
                style={styles.cover}
                source={{uri: item.cover}}
                resizeMode="cover"
              />
            ))}
            <Carousel
              width={itemWidth}
              height={itemHeight}
              style={{
                width: wp(100),
                height: wp(100),
              }}
              loop
              data={data}
              renderItem={({index, item}) => renderItem(index, item)}
              customAnimation={animationStyle}
              onProgressChange={(a, b) => console.log('xxx:', a, b)}
            />
          </View>
        )}
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default memo(Movie);
