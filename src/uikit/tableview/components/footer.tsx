import React, {Component} from 'react';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import Text from '~/uikit/themes/font-text';
import {statusFooterStr, textColor, TFooterState} from '../utils';

interface IFooterProps {
  footerState: TFooterState;
}

export default class Footer extends Component<IFooterProps> {
  shouldComponentUpdate(next: IFooterProps) {
    return next.footerState !== this.props.footerState;
  }

  render() {
    const {footerState} = this.props;
    return (
      <View style={styles.container}>
        {footerState === 'Refreshing' ? (
          <ActivityIndicator
            style={styles.indicator}
            animating
            hidesWhenStopped
            size={10}
            color={textColor}
          />
        ) : null}
        <Text style={styles.text}>{statusFooterStr(footerState)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  indicator: {
    marginRight: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: textColor,
  },
});
