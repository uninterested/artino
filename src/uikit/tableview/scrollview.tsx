import React, {Component, LegacyRef} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {State} from 'react-native-refresh';
import Refresher from './components/header';
import {statusStr} from './utils/index';

interface ICustomerProps extends ScrollViewProps {
  hex?: string;
  refs?: LegacyRef<ScrollView>;
  onRefresh?: () => Promise<any>;
}

interface ICustomerState {
  headerState: State;
}

class Customer<T extends ICustomerProps> extends Component<T, ICustomerState> {
  constructor(props: T) {
    super(props);
    this.state = {
      headerState: 'Idle',
    };
  }
  private isBusy: boolean = false;

  private onPullingRefresh = () => {
    this.setState({
      headerState: 'Pulling',
    });
  };

  public onRefresh = async () => {
    const {onRefresh} = this.props;
    if (!onRefresh || this.isBusy) return;
    this.isBusy = true;
    this.setState({
      headerState: 'Refreshing',
    });
    return new Promise(r => {
      onRefresh().finally(() => {
        this.isBusy = false;
        this.setState({
          headerState: 'Idle',
        });
        r(true);
      });
    });
  };

  private onEndRefresh = () => {
    this.setState({
      headerState: 'Idle',
    });
  };

  private onIdleRefresh = () => {
    this.setState({
      headerState: 'Idle',
    });
  };

  private renderRefreshControl = () => {
    const {onRefresh} = this.props;
    if (!onRefresh) return undefined;
    const {headerState} = this.state;
    return (
      <Refresher
        hex={this.props.hex}
        refreshing={headerState === 'Refreshing'}
        statusStr={statusStr(headerState)}
        onPullingRefresh={this.onPullingRefresh}
        onRefresh={this.onRefresh}
        onEndRefresh={this.onEndRefresh}
        onIdleRefresh={this.onIdleRefresh}
      />
    );
  };

  render() {
    return (
      <ScrollView
        scrollEventThrottle={16}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{backgroundColor: 'transparent'}}
        alwaysBounceVertical
        scrollIndicatorInsets={{right: 1}}
        {...this.props}
        refreshControl={this.renderRefreshControl()}
        ref={this.props.refs}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default Customer;
