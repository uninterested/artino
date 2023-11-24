import {atom, selector} from 'recoil';

export const caculateColor = (isDark: boolean) => {
  return {
    isDark,
    textColor: isDark ? 'rgba(255,255,255,1)' : '#1d2129',
    textColor2: isDark ? 'rgba(255,255,255,0.7)' : '#4e5969',
    textColor3: isDark ? 'rgba(255,255,255,0.5)' : '#86909c',
    primaryColor: '#e62318',
    backgroundColor: isDark ? '#17171a' : '#ffffff',
    backgroundColor2: isDark ? '#292929' : '#fcfcfc',
    backgroundColor3: isDark ? '#2e2e30' : '#f8f8f8',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#F5F5F5',
    placeholderColor: isDark ? '#888' : 'rgba(0,0,0,0.5)',
    switchBackgroundColor: isDark ? 'rgba(255,255,255,0.5)' : '#dddddd',
  };
};

export const themeState = atom<TTheme>({
  key: 'themeState',
  default: 'dark',
});

export const themeValue = selector<ThemeColorMap>({
  key: 'KTHEMEVALUE',
  get: ({get}) => {
    const isDark = get(themeState) === 'dark';
    return caculateColor(isDark);
  },
});
