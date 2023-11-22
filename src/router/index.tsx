import React, {useCallback, useMemo} from 'react';
import {
  LinkingOptions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {View, TouchableOpacity} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

const Home1 = () => {
  const h = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => h.navigate('Home2', {present: false})}>
        <Animated.View
          sharedTransitionTag="sharedTag"
          style={{
            position: 'absolute',
            left: 100,
            top: 200,
            width: 50,
            height: 50,
            backgroundColor: 'yellow',
          }}></Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const Home2 = () => {
  const h = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <TouchableOpacity activeOpacity={1} onPress={() => h.pop()}>
        <Animated.View
          sharedTransitionTag="sharedTag"
          style={{
            position: 'absolute',
            left: 100,
            top: 400,
            width: 200,
            height: 200,
            backgroundColor: 'pink',
          }}></Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const Linking = useMemo(
    (): LinkingOptions<POJO> => ({prefixes: ['artino://']}),
    [],
  );

  const nullHeader = useCallback(() => null, []);

  const horizontalConf = (animated: boolean): NativeStackNavigationOptions => ({
    headerShown: false,
    headerTransparent: true,
    header: nullHeader,
    gestureEnabled: true,
    fullScreenGestureEnabled: true,
    animation: 'slide_from_right',
    animationDuration: animated ? undefined : 0,
  });

  const verticalConf = (animated: boolean): NativeStackNavigationOptions => ({
    headerShown: false,
    headerTransparent: true,
    header: nullHeader,
    gestureEnabled: true,
    fullScreenGestureEnabled: true,
    animation: 'slide_from_bottom',
    gestureDirection: 'vertical',
    animationDuration: animated ? undefined : 0,
  });

  return (
    <NavigationContainer linking={Linking}>
      <Stack.Navigator
        screenOptions={({route, navigation}) => {
          if (!navigation.isFocused) return horizontalConf(true);
          const animated = (route.params as POJO)?.animated;
          const present = (route.params as POJO)?.present;
          return present
            ? verticalConf([undefined, true].includes(animated))
            : horizontalConf([undefined, true].includes(animated));
        }}>
        <Stack.Screen name="Home1" component={Home1} />
        <Stack.Screen name="Home2" component={Home2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
