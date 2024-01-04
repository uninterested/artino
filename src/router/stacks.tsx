import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Main from '~/pages/main';
//movie start
import Movie from '~/pages/movie/index';
import MovieDetail from '~/pages/movie/detail';
import MovieOrder from '~/pages/movie/order';
//movie end

// mini-program start
import Mini from '~/pages/mini-program';
// mini-program end

const stacks = {
  Main,
  // movie
  Movie,
  MovieDetail,
  MovieOrder,
  // mini
  Mini,
};

export type TRouterParams = {
  Main: TRouteParams;
  Movie: TRouteParams;
  MovieDetail: TRouteParams & {
    id: string;
    position?: IPosition;
  };
  MovieOrder: TRouteParams & {
    position?: IPosition;
  };
  Mini: TRouteParams & {
    appId: string;
    type: 0 | 1 | 2; // 0体验版 1生产 2开发
  };
};

export type keys = keyof TRouterParams;

export type TRouter = RouteProp<TRouterParams, keys>;

export type TNavigation = StackNavigationProp<TRouterParams, keys>;

export default stacks;
