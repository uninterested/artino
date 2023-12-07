import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

export type TLayoutStatus = 0 | 1;

export interface IPageResultProps {
  layoutDuration: number;
  maskStyle: DefaultStyle;
  iconStyle: DefaultStyle;
  bookStyle: DefaultStyle;
  bookTextStyle: DefaultStyle;
  navigateStyle: DefaultStyle;
  layoutStatus: TLayoutStatus;
}
export interface IPageMethodProps {
  updateStatus: NoopT<TLayoutStatus>;
  onBooking: Noop;
}
