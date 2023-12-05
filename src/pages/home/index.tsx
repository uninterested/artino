import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import Animated, {withTiming} from 'react-native-reanimated';

const Home = () => {
  const layout = values => {
    'worklet';
    const animations = {
      width: withTiming(values.targetWidth, {duration: 300}),
      height: withTiming(values.targetHeight, {duration: 300}),
      originX: withTiming(values.targetOriginX, {duration: 300}),
      originY: withTiming(values.targetOriginY, {duration: 300}),
      globalOriginX: withTiming(values.targetGlobalOriginX, {duration: 300}),
      globalOriginY: withTiming(values.targetGlobalOriginY, {duration: 300}),
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

  const s = useNavigation();
  const [A, setA] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setA(v => !v);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
      }}>
      <Animated.View
        style={[
          {
            width: A ? 100 : Dimensions.get('window').width,
            height: A ? 100 : 200,
            backgroundColor: 'red',
          },
          A
            ? {
                position: 'absolute',
                left: 190,
                top: 644,
              }
            : undefined,
        ]}
        layout={layout}
        // entering={layout}
        // exiting={exiting}
      >
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => {
            setA(!A);
            setTimeout(() => {
              s.pop();
            }, 300);
          }}
        />
      </Animated.View>
    </View>
  );
};

export default Home;
