import {memo, useCallback} from 'react';
import {ListRenderItemInfo, TouchableOpacity, View} from 'react-native';
import styles from './style';
import ReactContext from './context';
import Header from '~/uikit/themes/header';
import ArrowCell from '~/uikit/tableview/cells/arrow';
import TableView from '~/uikit/tableview/flatlist';
import usePageHooks from './hooks';
import {IListItemModel} from './types';
import BackgroundView from '~/uikit/themes/background-view';

const Main = () => {
  const hooks = usePageHooks();
  const [{data}, {onItemClick}] = hooks;

  const renderItem = useCallback((info: ListRenderItemInfo<IListItemModel>) => {
    const {item, index} = info;
    return (
      <ArrowCell
        title={item.title}
        hideLine={index === (data?.length ?? 0) - 1}
        onPress={() => onItemClick(item)}
      />
    );
  }, []);

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView style={styles.container}>
        <Header title="项目列表" left={false} />
        <TableView data={data} renderItem={renderItem} />
      </BackgroundView>
    </ReactContext.Provider>
  );
};

export default memo(Main);
