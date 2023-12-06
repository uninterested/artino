import React, {Component} from 'react';
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Text from '~/uikit/themes/font-text';
import style from './style';
import {wp} from '~/utils/responsive';

export interface ICellProps {
  cellStyle?: StyleProp<ViewStyle>;
  title?: JSX.Element | string;
  titleStyle?: StyleProp<TextStyle>;
  detail?: JSX.Element | string;
  detailStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  hideLine?: boolean;
  lineEdgeInsert?: {left: number; right: number};
}

class Cell<T> extends Component<T & ICellProps> {
  private renderLine = () => {
    const {hideLine, lineEdgeInsert} = this.props;
    if (hideLine) return null;
    const edgeInsert = {...(lineEdgeInsert || {left: 15, right: 0})} as {
      left: number;
      right: number;
    };
    edgeInsert.left = Math.max(0, edgeInsert.left);
    edgeInsert.right = Math.max(0, edgeInsert.right);
    return (
      <View
        style={[
          style.line,
          edgeInsert,
          {width: wp(100) - edgeInsert.left - edgeInsert.right},
        ]}
      />
    );
  };

  protected renderAccessory = (): JSX.Element | null => null;

  private renderTitle = () => {
    const {title, titleStyle} = this.props;
    if (!title) return null;
    if (React.isValidElement(title)) return title;
    return <Text style={[style.title, titleStyle]}>{title}</Text>;
  };

  private renderDetail = () => {
    const {detail, detailStyle} = this.props;
    if (!detail) return null;
    if (React.isValidElement(detail)) return detail;
    return (
      <Text
        numberOfLines={1}
        level={2}
        style={[style.detailTitle, detailStyle]}>
        {detail}
      </Text>
    );
  };

  render() {
    const {cellStyle, onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        disabled={!onPress}
        onPress={onPress}
        style={[style.container, cellStyle]}>
        {this.renderTitle()}
        {this.renderDetail()}
        {this.renderAccessory()}
        {this.renderLine()}
      </TouchableOpacity>
    );
  }
}

export default Cell;
