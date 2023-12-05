import React from 'react'
import Switch, { ISwitchProps } from '~/uikit/switch'
import Cell, { ICellProps } from './cell'

class SwitchCell extends Cell<ISwitchProps & ICellProps> {
  renderAccessory = () => {
    return <Switch {...this.props} />
  }
}

export default SwitchCell
