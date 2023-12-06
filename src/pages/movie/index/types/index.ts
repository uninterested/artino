import {LayoutChangeEvent, View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export interface IMovieModel {
  id: string;
  title: string;
  icon: string;
  cover: string;
  video: string;
  stars: number;
  info: {
    director: string;
    year: string;
    duration: number;
  };
  type: string[];
  describe: string;
  actor: {
    name: string;
    icon: string;
  }[];
}
export interface IPageResultProps {
  data?: IMovieModel[];
  colors: string[];
  coverIndex: string;
  activeIndex: number;
  viewRef: React.RefObject<View>;
  sharedStyle: React.MutableRefObject<
    {
      opacity: number;
    }[]
  >;
}
export interface IPageMethodProps {
  init: Noop;
  onScroll: NoopT<number>;
  onScrollBegin: Noop;
  onItemClick: (id: IMovieModel) => Noop;
  onItemLayout: (id: string) => NoopT<LayoutChangeEvent>;
  onScrollEnd: NoopT<number>;
}
