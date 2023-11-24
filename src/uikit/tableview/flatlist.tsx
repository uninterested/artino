import React, {Component, LegacyRef} from 'react';
import {FlatList, FlatListProps, StyleSheet, View} from 'react-native';
import {State} from 'react-native-refresh';
import Footer from './components/footer';
import Refresher from './components/header';
import {statusStr, TFooterState} from './utils';

interface ICustomerProps<T = any>
  extends Exclude<FlatListProps<T>, 'data' | 'refreshing' | 'onRefresh'> {
  hex?: string;
  data: ReadonlyArray<T> | undefined;
  refs?: LegacyRef<FlatList>;
  onHeaderRefresh?: () => Promise<boolean | undefined>;
  onFooterRefresh?: () => Promise<boolean | undefined>;
  defaultLoadingComponent?: React.ReactElement;
  defaultEmptyComponent?: React.ReactElement;
}

interface ICustomerState {
  headerState: State;
  footerState: TFooterState;
}

class Customer<T extends ICustomerProps> extends Component<T, ICustomerState> {
  constructor(props: T) {
    super(props);
    this.state = {
      headerState: 'Idle',
      footerState: 'Idle',
    };
  }

  /**
   * 是否正忙，避免多次处理下拉上提操作
   */
  private isBusy: boolean = false;

  private onPullingRefresh = () => {
    this.setState({
      headerState: 'Pulling',
    });
  };

  /**
   * 下拉刷新处理方法
   * @returns
   */
  private onRefresh = async () => {
    const {onHeaderRefresh} = this.props;
    if (!onHeaderRefresh || this.isBusy) return;
    this.isBusy = true;
    this.setState({
      headerState: 'Refreshing',
    });
    return new Promise(r => {
      onHeaderRefresh()
        .then(end => {
          this.setState({
            headerState: 'Idle',
            footerState: end ? 'NoMore' : 'Idle',
          });
        })
        .catch(() => this.setState({headerState: 'Idle'}))
        .finally(() => {
          this.isBusy = false;
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

  private onEndReached = (info: {distanceFromEnd: number}) => {
    const {data, onFooterRefresh, onEndReached} = this.props;
    const {footerState} = this.state;
    onEndReached?.(info);
    if (
      data === undefined ||
      !onFooterRefresh ||
      this.isBusy ||
      footerState === 'NoMore'
    )
      return;
    this.isBusy = true;
    this.setState({
      footerState: 'Refreshing',
    });
    onFooterRefresh()
      .then(end => this.setState({footerState: end ? 'NoMore' : 'Idle'}))
      .catch(() => this.setState({footerState: 'Idle'}))
      .finally(() => (this.isBusy = false));
  };

  private renderRefreshControl = () => {
    const {onHeaderRefresh} = this.props;
    if (!onHeaderRefresh) return undefined;
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

  // 处理空数据的占位
  private renderEmptyComponent = () => {
    const {data, defaultLoadingComponent, defaultEmptyComponent} = this.props;
    if (data === undefined) return defaultLoadingComponent;
    if (data.length <= 0) return defaultEmptyComponent;
    return null;
  };

  // 重写footer
  private renderFooter = () => {
    const {onFooterRefresh, ListFooterComponent, data} = this.props;
    if (!onFooterRefresh) return ListFooterComponent;
    if (data === undefined) return ListFooterComponent;
    const {footerState} = this.state;
    return (
      <View>
        {ListFooterComponent as Primitive}
        <Footer footerState={footerState} />
      </View>
    );
  };

  render() {
    const style = StyleSheet.flatten(this.props.style || {});
    const hasHeight = !!style.height;
    return (
      <FlatList
        removeClippedSubviews
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{backgroundColor: 'transparent'}}
        alwaysBounceVertical
        scrollIndicatorInsets={{right: 1}}
        scrollEventThrottle={16}
        {...this.props}
        style={[this.props.style, hasHeight ? {flexGrow: 0} : undefined]}
        ListEmptyComponent={this.renderEmptyComponent()}
        refreshControl={this.renderRefreshControl()}
        ListFooterComponent={this.renderFooter()}
        onEndReached={this.onEndReached}
        ref={this.props.refs}
      />
    );
  }
}

export default Customer;
