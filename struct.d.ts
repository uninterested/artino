declare type Primitive = string | boolean | number | null | undefined | any;
declare type Trivial = string | number;
declare type POJO<T = any> = {
  [p: string]: T;
};
declare type POVO = {
  [p: string]: Primitive;
};
declare type POTO = {
  [p: string]: Trivial;
};
declare type POSO = {
  [p: string]: string;
};
declare interface PIJO<T = any> {
  [x: number]: T;
}
declare interface PITO<T = Trivial> {
  [x: number]: T;
}
declare interface PISO {
  [x: number]: string;
}
declare interface PINO {
  [x: number]: number;
}

type AsyncNoopBool<T = any> = (e?: T) => Promise<boolean>;

declare type TRouteParams =
  | undefined
  | {
      animated?: boolean;
      present?: boolean;
    }
  | POJO;

declare type TTheme = 'light' | 'dark';

declare interface ThemeColorMap {
  isDark: boolean;
  textColor: string;
  textColor2: string;
  textColor3: string;
  primaryColor: string;
  backgroundColor: string;
  backgroundColor2: string;
  backgroundColor3: string;
  borderColor: string;
  placeholderColor: string;
  switchBackgroundColor: string;
}
