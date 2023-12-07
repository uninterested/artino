import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

export type TTransactionValue = 0 | 1;

export interface IPageResultProps {
  maskStyle: DefaultStyle;
}
export interface IPageMethodProps {
  onUpdateValue: NoopT<TTransactionValue>;
}
