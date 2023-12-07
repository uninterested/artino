import {memo, useCallback, useEffect} from 'react';
import styles from './style';
import ReactContext from './context';
import usePageHooks from './hooks';
import BackgroundView from '~/uikit/themes/background-view';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {IMovieModel} from '../index/types';
import Animated, {
  FadeInDown,
  FadeOutDown,
  LayoutAnimationConfig,
} from 'react-native-reanimated';
import Text from '~/uikit/themes/font-text';
import {BackHandler, Dimensions, TouchableOpacity, View} from 'react-native';
import IconFont from '~/uikit/themes/icon-font';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import FastImage from 'react-native-fast-image';
import Headers from '~/uikit/themes/header';
import ScrollView from '~/uikit/tableview/scrollview';
import SafeBottomView from '~/uikit/themes/safe-bottom';
import {hp} from '~/utils/responsive';

const MovieDetail = () => {
  const {primaryColor, borderColor} = useRecoilValue(themeValue);
  const hooks = usePageHooks();
  const router = useRoute();
  const {item} = router.params as {
    id: string;
    position: IPosition;
    item: IMovieModel;
  };

  const [
    {
      layoutStatus,
      maskStyle,
      iconStyle,
      bookStyle,
      navigateStyle,
      layoutDuration,
      bookTextStyle,
    },
    {updateStatus, onBooking},
  ] = hooks;

  useEffect(() => {
    requestAnimationFrame(() => {
      updateStatus(1);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        updateStatus(0);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const renderBody = useCallback(() => {
    return (
      <LayoutAnimationConfig>
        {layoutStatus === 0 ? null : (
          <Animated.View
            entering={FadeInDown.duration(layoutDuration)
              .delay(100)
              .springify()
              .damping(12)}
            exiting={FadeOutDown.duration(layoutDuration)
              .springify()
              .damping(12)}
            style={[styles.body]}>
            <Text style={[styles.cast, styles.topOffset]}>故事线</Text>
            <Text level={1} style={[styles.story, styles.topOffsetNormal]}>
              {item.describe}
            </Text>
            <Text style={[styles.cast, styles.topOffset]}>演员阵容</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              horizontal
              style={[styles.topOffset, styles.radius]}>
              {item.actor.map((actor, i) => (
                <View
                  key={actor.name}
                  style={[
                    styles.actorMask,
                    styles.center,
                    i === item.actor.length - 1 ? {marginRight: 0} : undefined,
                  ]}>
                  <FastImage
                    style={[styles.actor, styles.radius]}
                    source={{uri: actor.icon}}
                    resizeMode="cover"
                  />
                  <Text style={[styles.topOffsetNormal, styles.actorName]}>
                    {actor.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <BackgroundView style={[styles.topOffset, styles.infoWrap]}>
              <Text style={styles.info}>
                导演<Text style={styles.detail}>{`:  `}</Text>
                <Text style={styles.detail}>{item.info.director}</Text>
              </Text>
              <Text style={styles.info}>
                时长<Text style={styles.detail}>{`:  `}</Text>
                <Text style={styles.detail}>{item.info.duration} min</Text>
              </Text>
              <Text style={styles.info}>
                上映年份<Text style={styles.detail}>{`:  `}</Text>
                <Text style={styles.detail}>{item.info.year}</Text>
              </Text>
            </BackgroundView>
            <SafeBottomView fixedHeight={80} />
          </Animated.View>
        )}
      </LayoutAnimationConfig>
    );
  }, [layoutStatus]);

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView level={2} animated style={[styles.container, maskStyle]}>
        <Headers
          animated
          transparent
          border={false}
          barStyle={navigateStyle}
          left={{type: 'ICON', value: `\ue60d`, action: () => updateStatus(0)}}
        />
        <ScrollView
          style={[styles.flex]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollview]}>
          <Animated.View style={[iconStyle, styles.iconWrap]}>
            <FastImage
              style={[styles.icon]}
              resizeMode="cover"
              source={{uri: item.icon}}
            />
          </Animated.View>
          <Text animated style={styles.title} numberOfLines={1}>
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
          {renderBody()}
        </ScrollView>
        <BackgroundView animated style={[styles.book, bookStyle]}>
          <TouchableOpacity
            style={[styles.flex, styles.center]}
            activeOpacity={1}
            onPress={onBooking}>
            <Text animated style={[styles.bookText, bookTextStyle]}>
              立即订票
            </Text>
          </TouchableOpacity>
        </BackgroundView>
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default memo(MovieDetail);
