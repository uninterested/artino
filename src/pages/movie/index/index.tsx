import {memo, useCallback, useEffect, useRef} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ReactContext from './context';
import usePageHooks from './hooks';
import styles from './style';
import Header from '~/uikit/themes/header';
import Text from '~/uikit/themes/font-text';
import BackgroundView from '~/uikit/themes/background-view';
import Animated, {FadeInDown, FadeInRight} from 'react-native-reanimated';
import {TouchableOpacity, View} from 'react-native';
import {IMovieModel} from './types';
import IconFont from '~/uikit/themes/icon-font';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const Movie = () => {
  const {primaryColor, borderColor} = useRecoilValue(themeValue);
  const hooks = usePageHooks();
  const [
    {
      data,
      colors,
      viewRef,
      activeIndex,
      sharedStyle,
      coverIndex,
      animationStyle,
      layoutValues,
    },
    {init, onScroll, onScrollBegin, onScrollEnd, onItemClick, onItemLayout},
  ] = hooks;

  useEffect(() => {
    init();
  }, []);

  const renderItem = useCallback(
    (index: number, item: IMovieModel) => {
      return (
        <BackgroundView
          entering={FadeInDown.delay(index * 150).springify()}
          level={2}
          ref={index === 0 ? viewRef : undefined}
          style={styles.card}
          onLayout={index === 0 ? onItemLayout(item.id) : undefined}
          key={item.id}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, styles.box]}
            disabled={activeIndex !== index}
            onPress={onItemClick(item)}>
            <FastImage
              source={{uri: item.icon}}
              style={styles.icon}
              resizeMode="cover"
            />
            <Text style={styles.title} numberOfLines={1}>
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
    },
    [activeIndex],
  );

  const renderCover = useCallback(() => {
    const map: PINO = {0: -1, 1: 0, 2: -1};
    return coverIndex.split(',').map((v, i) => {
      return (
        <Animated.View
          key={data?.[+v]?.id ?? i}
          style={[styles.coverImg, {zIndex: map[i]}, sharedStyle.current[i]]}>
          <FastImage
            style={styles.container}
            source={{uri: data?.[+v]?.cover}}
            resizeMode="cover"
          />
        </Animated.View>
      );
    });
  }, [data, sharedStyle.current, coverIndex]);

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView style={styles.container}>
        <Header transparent border={false} />
        {!data?.length ? null : (
          <View style={[styles.container, styles.center]}>
            {renderCover()}
            <LinearGradient
              colors={colors}
              locations={[0, 0.35]}
              style={styles.cover}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            />
            <Carousel
              width={layoutValues.itemWidth}
              height={layoutValues.itemHeight}
              style={styles.carousel}
              pagingEnabled
              loop
              data={data}
              renderItem={({index, item}) => renderItem(index, item)}
              customAnimation={animationStyle}
              onProgressChange={(_, per) => onScroll(per)}
              onScrollBegin={onScrollBegin}
              onScrollEnd={onScrollEnd}
            />
          </View>
        )}
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default memo(Movie);
