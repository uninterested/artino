import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';
import {IMovieModel} from '../../index/types';

export type TTransactionValue = 0 | 1 | 2;

export type TSecne = 'init' | 'time' | 'seat';

export interface IDateConfig {
  year: number;
  month: number;
  date: {week: string; day: number; time: string[]}[];
}

export interface IParamsProps {
  item: IMovieModel;
  position: IPosition;
}

export interface ISeatModel {
  price: number;
  status: 'selled' | 'available';
  core: boolean;
  key: string;
}

export interface IPageResultProps {
  seatInfo: ISeatModel[][];
  opacityStyle: DefaultStyle;
  videoStyle: DefaultStyle;
  duration: number;
  coverStyle: DefaultStyle;
  dateConfig: IDateConfig;
  colors: string[];
  maskStyle: DefaultStyle;
  navigateStyle: DefaultStyle;
  scene: TSecne;
  dateScrollStyle: DefaultStyle;
  selectDay?: number;
  selectTime?: string;
}
export interface IPageMethodProps {
  onUpdateValue: NoopT<TTransactionValue>;
  onUpdateDay: NoopT<number | undefined>;
  onUpdateTime: NoopT<string | undefined>;
  toggleDateView: NoopT<TTransactionValue>;
  onSelectSeat: Noop;
}
