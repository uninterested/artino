export interface IListItemModel {
  title: string;
  key: string;
}
export interface IPageResultProps {
  data: IListItemModel[];
}
export interface IPageMethodProps {
  onItemClick: NoopT<IListItemModel>;
}
