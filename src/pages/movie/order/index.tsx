import BackgroundView from '~/uikit/themes/background-view';
import ReactContext from './context';
import usePageHooks from './hooks';
import styles from './style';
import {useEffect} from 'react';

const MovieOrder = () => {
  const hooks = usePageHooks();
  const [{maskStyle}, {onUpdateValue}] = hooks;

  useEffect(() => {
    requestAnimationFrame(() => {
      onUpdateValue(1);
    });
  }, []);

  return (
    <ReactContext.Provider value={hooks}>
      <BackgroundView animated style={[maskStyle]}></BackgroundView>
    </ReactContext.Provider>
  );
};

export default MovieOrder;
