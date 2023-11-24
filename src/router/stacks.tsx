import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Main from '~/pages/main';
import Home from '~/pages/home';

const stacks = {
  Main,
  Home,
};

export type TRouterParams = {
  Main: TRouteParams;
  Home: TRouteParams;
};

export type keys = keyof TRouterParams;

export type TRouter = RouteProp<TRouterParams, keys>;

export type TNavigation = StackNavigationProp<TRouterParams, keys>;

export default stacks;
