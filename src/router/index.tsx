import React, {useCallback, useMemo} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import stacks, {keys} from './stacks';
import {useRecoilValue} from 'recoil';
import {themeValue} from '~/recoil-state/theme';
import {Dimensions, Platform} from 'react-native';

const kDefaultDuration: number = 250;
const kDefaultNoAnimationDuration: number = 0;

const App = () => {
  const theme = useRecoilValue(themeValue);

  const themeMemo = useMemo(() => {
    return {
      dark: theme.isDark,
      colors: {
        primary: theme.primaryColor,
        background: theme.backgroundColor,
        card: 'transparent',
        text: theme.textColor,
        border: 'transparent',
        notification: theme.backgroundColor,
      },
    };
  }, [theme]);

  const scaleWH = useMemo(() => Dimensions.get('window'), []);

  const Stack = useMemo(() => createStackNavigator(), []);

  const Linking = useMemo(
    (): LinkingOptions<POJO> => ({prefixes: ['artino://']}),
    [],
  );

  const routeStacks = useMemo(
    () =>
      Object.keys(stacks).map(key => (
        <Stack.Screen name={key} key={key} component={stacks[key as keys]} />
      )),
    [stacks],
  );

  const horizontalConf = (animated: boolean = true): StackNavigationOptions => {
    return {
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS.bind({
        animated,
      }),
      header: () => null,
      headerShown: false,
      cardOverlayEnabled: false,
      cardShadowEnabled: false,
      headerShadowVisible: false,
      headerTransparent: true,
      gestureEnabled: true,
      cardStyle: {
        backgroundColor: 'transparent',
      },
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: animated ? kDefaultDuration : kDefaultNoAnimationDuration,
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: kDefaultDuration,
          },
        },
      },
      headerStyle: {
        height: 0,
        backgroundColor: 'transparent',
      },
      gestureResponseDistance: scaleWH.width,
    };
  };

  const verticalConf = (
    animated: boolean = true,
    card: boolean = false,
  ): StackNavigationOptions => {
    const isIos = Platform.OS === 'ios';
    return {
      gestureDirection: 'vertical',
      cardStyleInterpolator:
        card && isIos
          ? CardStyleInterpolators.forModalPresentationIOS
          : CardStyleInterpolators.forVerticalIOS,
      header: () => null,
      cardOverlayEnabled: true,
      headerShown: false,
      cardShadowEnabled: false,
      headerShadowVisible: false,
      headerTransparent: true,
      gestureEnabled: true,
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: animated ? kDefaultDuration : kDefaultNoAnimationDuration,
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: kDefaultDuration,
          },
        },
      },
      headerStyle: {
        height: 0,
        backgroundColor: 'transparent',
      },
      gestureResponseDistance: scaleWH.height,
    };
  };

  return (
    <NavigationContainer theme={themeMemo} linking={Linking}>
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
