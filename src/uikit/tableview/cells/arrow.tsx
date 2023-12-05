import React from 'react';
import Cell, {ICellProps} from './cell';
import style from './style';
import IconFont from '~/uikit/themes/icon-font';

class ArrowCell extends Cell<ICellProps> {
  renderAccessory = () => {
    return (
      <IconFont style={style.arrow} level={1}>
        {'\ue650'}
      </IconFont>
    );
  };
}

export default ArrowCell;
