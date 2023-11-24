import React, {useCallback, useMemo} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import stacks, {keys} from './stacks';

const App = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);

  const Linking = useMemo(
    (): LinkingOptions<POJO> => ({prefixes: ['artino://']}),
    [],
  );

  const nullHeader = useCallback(() => null, []);

  const routeStacks = useMemo(
    () =>
      Object.keys(stacks).map(key => (
        <Stack.Screen name={key} key={key} component={stacks[key as keys]} />
      )),
    [stacks],
  );

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
        {routeStacks}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
