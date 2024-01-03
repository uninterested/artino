import {useCallback, useMemo} from 'react';
import {IListItemModel, IPageMethodProps, IPageResultProps} from '../types';
import {useNavigation} from '@react-navigation/native';
import {TNavigation} from '~/router/stacks';

const usePageHooks = (): [IPageResultProps, IPageMethodProps] => {
  const navigation = useNavigation() as TNavigation;

  const data: IListItemModel[] = useMemo(() => {
    return [
      {
        title: '电影票',
        key: 'movie',
      },
      {
        title: '小程序',
        key: 'mini',
      },
    ];
  }, []);

  const onItemClick = useCallback((data: IListItemModel) => {
    switch (data.key) {
      case 'movie':
        navigation.navigate('Movie');
        break;
      case 'mini':
        navigation.navigate('Mini');
        break;
      default:
        throw new Error('unknow');
    }
  }, []);

  return [
    {data},
    {
      onItemClick,
    },
  ];
};

export default usePageHooks;
