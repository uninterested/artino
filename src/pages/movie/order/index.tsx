import BackgroundView from '~/uikit/themes/background-view';
import BackgroundScrollView from '~/uikit/themes/background-scrollview';
import ReactContext from './context';
import usePageHooks from './hooks';
import styles from './style';
import Headers from '~/uikit/themes/header';
import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '~/uikit/themes/font-text';
import SafeBottomView from '~/uikit/themes/safe-bottom';
import Video from 'react-native-video';
import {ScrollView, View} from 'react-native';
import IconFont from '~/uikit/themes/icon-font';
import {IParamsProps} from './types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {hp, wp} from '~/utils/responsive';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Top from './components/top';
import Bottom from './components/bottom';

const MovieOrder = () => {
  const hooks = usePageHooks();
  const [
    {
      seatInfo,
      opacityStyle,
      videoStyle,
      duration,
      coverStyle,
      colors,
      maskStyle,
      navigateStyle,
      scene,
      dateScrollStyle,
      dateConfig,
      selectDay,
      selectTime,
    },
    {onUpdateValue, onUpdateDay, onUpdateTime, toggleDateView},
  ] = hooks;

  const {textColor3, backgroundColor3, primaryColor} =
    useRecoilValue(themeValue);
  const {bottom, top} = useSafeAreaInsets();
  const {item} = useRoute().params as IParamsProps;

  useEffect(() => {
    requestAnimationFrame(() => {
      onUpdateValue(1);
    });
  }, []);

  const renderCover = () => {
    if ('init' === scene) return null;
    return (
      <Animated.View
        style={[styles.cover, coverStyle]}
        entering={FadeIn.duration(200).springify().easing(Easing.linear)}>
        <FastImage
          style={[styles.flex]}
          source={{uri: item.cover}}
          resizeMode="cover"
        />
        <LinearGradient
          colors={colors}
          locations={[0, 0.93]}
          style={styles.mask}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
      </Animated.View>
    );
  };

  const renderDate = () => {
    if (scene !== 'time') return null;
    const timeValue = dateConfig.date.find(e => e.day === selectDay);
    return (
      <BackgroundView animated style={[styles.date, dateScrollStyle]}>
        <Text style={[styles.title]}>选择日期和时间</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          style={[styles.flex]}
          contentContainerStyle={[
            styles.scrollview,
            {minHeight: hp(83) - bottom - 50},
          ]}>
          <View>
            {getVideo(false)}
            <Text
              style={[styles.topOffset, styles.name]}
              numberOfLines={2}>{`${item.title} (${item.info.year})`}</Text>
            <View style={[styles.center, styles.topNormal, styles.row]}>
              <IconFont
                level={1}
                style={[styles.dateIcon]}>{`\ue62b`}</IconFont>
              <Text level={1} style={styles.ym}>
                {`${dateConfig.year} / ${dateConfig.month}`}
              </Text>
            </View>
            <View style={[styles.topNormal, styles.row, styles.dateWrap]}>
              {dateConfig.date.map(item => (
                <BackgroundView
                  level={2}
                  key={item.day === selectDay ? '_' + item.day : item.day}
                  entering={FadeInDown.duration(120).springify().damping(12)}
                  style={[
                    styles.dateView,
                    item.day === selectDay
                      ? {backgroundColor: primaryColor}
                      : undefined,
                  ]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.dateItem}
                    onPress={() => onUpdateDay(item.day)}>
                    <Text style={styles.week}>{item.week}</Text>
                    <View
                      style={[styles.split, {backgroundColor: textColor3}]}
                    />
                    <Text style={styles.day}>{item.day}</Text>
                  </TouchableOpacity>
                </BackgroundView>
              ))}
            </View>
            {timeValue ? (
              <Animated.View
                entering={FadeInDown.duration(200).springify()}
                style={[styles.topNormal, styles.row, styles.dateWrap]}>
                {timeValue.time.map(time => {
                  const isActive = time === selectTime;
                  return (
                    <BackgroundView
                      level={2}
                      key={time}
                      style={[
                        styles.dateView,
                        {borderWidth: 1},
                        {
                          borderColor: isActive
                            ? primaryColor
                            : backgroundColor3,
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.timeItem, styles.center]}
                        onPress={() => onUpdateTime(time)}>
                        <Text style={styles.time}>{time}</Text>
                      </TouchableOpacity>
                    </BackgroundView>
                  );
                })}
              </Animated.View>
            ) : null}
            <SafeBottomView fixedHeight={60} />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => toggleDateView(0)}
            style={[
              styles.book,
              styles.center,
              {backgroundColor: backgroundColor3},
              {marginBottom: bottom},
            ]}>
            <Text style={styles.bookText}>选择座位</Text>
          </TouchableOpacity>
        </ScrollView>
      </BackgroundView>
    );
  };

  const getVideo = (isPlus: boolean) => {
    return (
      <Video
        key="video"
        poster={item.cover}
        source={{uri: item.video}}
        style={isPlus ? styles.videoPlus : styles.video}
        posterResizeMode="cover"
        resizeMode="cover"
        pictureInPicture={false}
        playInBackground={false}
        playWhenInactive={false}
        allowsExternalPlayback={false}
        controls
        repeat
      />
    );
  };

  const renderSeat = () => {
    if (scene !== 'seat') return null;
    return (
      <BackgroundView
        animated
        style={[styles.flex, {paddingTop: top + 50, alignItems: 'center'}]}>
        <Animated.View style={[styles.videoPlus, styles.center, videoStyle]}>
          <Top opacityStyle={opacityStyle} />
          {getVideo(true)}
          <Bottom opacityStyle={opacityStyle} />
        </Animated.View>
        <Text
          entering={FadeInUp.withInitialValues({
            transform: [{translateY: -100}],
          })
            .duration(duration)
            .delay(100)
            .springify()
            .damping(10)}
          style={[styles.seatText]}>
          选择座位
        </Text>
        <View style={[styles.topNormal, styles.seatWrap]}>
          <ScrollView
            style={styles.flex}
            contentInsetAdjustmentBehavior="never"
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: (seatInfo[0]?.length ?? 0) * 44 + 8,
              height: seatInfo.length * 40,
            }}>
            {seatInfo.map((row, x) => (
              <Animated.View
                entering={FadeInDown.duration(2000)
                  .delay(150 * x)
                  .springify()}
                style={[styles.row, {paddingHorizontal: 8}]}
                key={x}>
                {row.map((col, y) => {
                  if (!col) {
                    return (
                      <View key={y} style={[styles.seatElem, styles.center]} />
                    );
                  }
                  return (
                    <TouchableOpacity
                      key={col.key}
                      activeOpacity={1}
                      disabled={col.status === 'selled'}
                      style={[styles.seatElem, styles.center]}>
                      <IconFont
                        entering={ZoomIn.delay(
                          150 * x + 150 * Math.abs(y - row.length * 0.5),
                        )
                          .duration(2000)
                          .springify()}
                        level={1}
                        style={[
                          styles.seat,
                          col.status === 'selled'
                            ? {color: primaryColor}
                            : undefined,
                        ]}>
                        {'\ue6ec'}
                      </IconFont>
                    </TouchableOpacity>
                  );
                })}
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </BackgroundView>
    );
  };

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView animated style={[maskStyle]}>
        <Headers animated transparent border={false} barStyle={navigateStyle} />
        {renderCover()}
        {renderDate()}
        {renderSeat()}
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default MovieOrder;
