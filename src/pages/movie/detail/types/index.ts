import {
  LayoutAnimation,
  LayoutAnimationsValues,
  SharedValue,
} from 'react-native-reanimated';

export type TLayoutStatus = 'init' | 'idle' | 'destory';

export interface IPageResultProps {
  layoutStatus: TLayoutStatus;
  transactionValue: SharedValue<number>;
  maskLayout: (values: LayoutAnimationsValues) => LayoutAnimation;
}
export interface IPageMethodProps {
  updateStatus: NoopT<TLayoutStatus>;
}
