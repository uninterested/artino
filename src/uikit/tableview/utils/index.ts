import dayjs from 'dayjs';
import {State} from 'react-native-refresh';

export type TFooterState = 'Idle' | 'Refreshing' | 'NoMore';

export const textColor = '#A9A9A9';

export const statusStr = (state: State): string => {
  switch (state) {
    case 'Pulling':
      return '松开立即刷新';
    case 'Refreshing':
      return '正在拼命刷新中...';
    case 'End':
      return '下拉刷新';
    case 'Idle':
      return '下拉刷新';
  }
};

export const statusFooterStr = (state: TFooterState): string => {
  switch (state) {
    case 'Refreshing':
      return '正在拼命刷新中...';
    case 'NoMore':
      return '--- 数据加载完毕 ---';
    case 'Idle':
      return '上提刷新';
  }
};

export const getRefreshStr = (time: number): string => {
  if (time <= 0) return `最后刷新: --`;
  const now = +new Date();
  const nowDay = dayjs(now);
  if (now - time < 60 * 1000) return '最后刷新: 刚刚';
  if (now - time < 60 * 60 * 1000)
    return `最后刷新: ${nowDay.diff(time, 'minute')}分钟前`;
  if (now - time < 24 * 60 * 60 * 1000)
    return `最后刷新: ${nowDay.diff(time, 'hour')}小时前`;
  return `最后刷新: ${nowDay.format('MM-DD HH:mm:ss')}`;
};
