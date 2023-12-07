import {LayoutChangeEvent, View} from 'react-native';
import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

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
  layoutValues: POJO;
  animationStyle: (value: number) => DefaultStyle;
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
