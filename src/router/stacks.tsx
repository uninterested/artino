import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Main from '~/pages/main';
import Home from '~/pages/home';
//movie start
import Movie from '~/pages/movie/index';
import MovieDetail from '~/pages/movie/detail';
import MovieOrder from '~/pages/movie/order';
//movie end

const stacks = {
  Main,
  Home,
  Movie,
  MovieDetail,
  MovieOrder,
};

export type TRouterParams = {
  Main: TRouteParams;
  Home: TRouteParams;
  Movie: TRouteParams;
  MovieDetail: TRouteParams & {
    id: string;
    position?: IPosition;
  };
  MovieOrder: TRouteParams & {
    position?: IPosition;
  };
};

export type keys = keyof TRouterParams;

export type TRouter = RouteProp<TRouterParams, keys>;

export type TNavigation = StackNavigationProp<TRouterParams, keys>;

export default stacks;
