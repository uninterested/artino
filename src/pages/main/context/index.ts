import {createContext} from 'react';
import {IPageMethodProps, IPageResultProps} from '../types';

const ReactContext = createContext<
  [IPageResultProps | undefined, IPageMethodProps | undefined]
>([undefined, undefined]);

export default ReactContext;
