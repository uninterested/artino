import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ScrollView as O,
  TouchableOpacity,
  Text,
} from 'react-native';
import ScrollView from '../tableview/scrollview';
import {wp} from '~/utils/responsive';

export interface ITabProps {
  value: string;
  key: string;
}

export interface ITabsProps {
  lazy?: boolean;
  width?: number;
  defalutActive?: number;
  lineColor: string;
  textColor: string;
  activeColor: string;
  tabs: ITabProps[];
}

const lineWidth: number = 30;

const Tabs: FC<PropsWithChildren<ITabsProps>> = props => {
  const [active, setActive] = useState<number>(props.defalutActive ?? 0);
  const {width = wp(100), lazy} = props;
  const rendered = useRef<PIJO<boolean>>({[active]: true});

  /**
   * 获取Offset偏移量
   * @param i
   * @returns
   */
  const getOffset = (i: number) => {
    const one = width / props.tabs.length;
    return one * i + (one - lineWidth) / 2;
  };

  const lineAni = useRef<Animated.Value>(new Animated.Value(getOffset(active)));

  const scrollViewRef = useRef<O>(null);

  useEffect(() => {
    Animated.timing(lineAni.current, {
      toValue: getOffset(active),
      duration: 250,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current?.scrollTo({x: active * width});
  }, [active]);

  /**
   * tab 点击事件
   * @param i
   * @returns
   */
  const onTabClick = (i: number) => {
    rendered.current[i] = true;
    setActive(i);
  };

  const renderHeader = () => {
    return (
      <View style={style.bar}>
        {props.tabs.map((tab, i) => (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={1}
            style={[style.item, style.center]}
            onPress={() => onTabClick(i)}>
            <Text
              style={[
                style.text,
                {color: i === active ? props.activeColor : props.textColor},
              ]}>
              {tab.value}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            style.line,
            {
              backgroundColor: props.lineColor,
              transform: [{translateX: lineAni.current}],
            },
          ]}
        />
      </View>
    );
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {x} = e.nativeEvent.contentOffset;
    const one = width / props.tabs.length;
    const value = (x / width) * one + (one - lineWidth) / 2;
    lineAni.current.setValue(value);
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      contentOffset: {x},
    } = e.nativeEvent;
    const index = Math.ceil(x / width);
    rendered.current[index] = true;
    onTabClick(index);
  };

  if (React.Children.count(props.children) !== props.tabs.length)
    throw new Error('Components error');

  const renderContent = () => {
    return (
      <ScrollView
        bounces={false}
        refs={scrollViewRef as Primitive}
        horizontal
        contentContainerStyle={{width: width * props.tabs.length}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={onScrollEnd}>
        {React.Children.map(props.children, (e, i) => {
          if (lazy === false || rendered.current[i]) {
            return (
              <View
                key={i}
                style={[style.contentStyle, {left: i * width, width}]}>
                {e}
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
    );
  };

  return (
    <View style={style.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  item: {
    flex: 1,
    height: '100%',
  },
  text: {
    fontSize: 14,
  },
  line: {
    width: lineWidth,
    height: 2,
    borderRadius: 1,
    position: 'absolute',
    bottom: 0,
  },
  contentStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});
export default Tabs;
