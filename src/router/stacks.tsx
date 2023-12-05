import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Main from '~/pages/main';
import Home from '~/pages/home';
//movie start
import Movie from '~/pages/movie/index';
//movie end

const stacks = {
  Main,
  Home,
  Movie,
};

export type TRouterParams = {
  Main: TRouteParams;
  Home: TRouteParams;
  Movie: TRouteParams;
};

export type keys = keyof TRouterParams;

export type TRouter = RouteProp<TRouterParams, keys>;

export type TNavigation = StackNavigationProp<TRouterParams, keys>;

export default stacks;
