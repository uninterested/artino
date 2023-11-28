import {useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
// import TableView from '~/uikit/tableview/flatlist';
import SectionList from '~/uikit/tableview/sectionlist';

const Main = () => {
  return (
    <SectionList
      style={{flex: 1, marginTop: 100}}
      sections={[
        {title: '111', data: [{key: 1}, {key: 2}]},
        {title: '222', data: [{key: 3}, {key: 4}]},
      ]}
      swipable
      renderRightAction={() => [
        <TouchableOpacity
          key="test1"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(45,99,166)',
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#fff'}}>AAA</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          key="test2"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(163,110,55)',
            flex: 1,
            paddingHorizontal: 30,
          }}>
          <Text style={{color: '#fff'}}>BBB</Text>
        </TouchableOpacity>,

        <TouchableOpacity
          key="test3"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(204,87,79)',
            flex: 1,
            paddingHorizontal: 40,
          }}>
          <Text style={{color: '#fff'}}>CCC</Text>
        </TouchableOpacity>,
      ]}
      renderItem={info => {
        console.log('ddddD: ', info);
        return <View style={{height: 50, backgroundColor: '#fff'}} />;
      }}></SectionList>
    // <TableView
    //   style={{flex: 1, marginTop: 100}}
    //   data={new Array(5).fill(0).map((_, e) => ({key: e + 1}))}
    //   swipable
    //   renderRightAction={() => [
    //     <TouchableOpacity
    //       key="test1"
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'rgb(45,99,166)',
    //         flex: 1,
    //         paddingHorizontal: 10,
    //       }}>
    //       <Text style={{color: '#fff'}}>AAA</Text>
    //     </TouchableOpacity>,
    //     <TouchableOpacity
    //       key="test2"
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'rgb(163,110,55)',
    //         flex: 1,
    //         paddingHorizontal: 30,
    //       }}>
    //       <Text style={{color: '#fff'}}>BBB</Text>
    //     </TouchableOpacity>,

    //     <TouchableOpacity
    //       key="test3"
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'rgb(204,87,79)',
    //         flex: 1,
    //         paddingHorizontal: 40,
    //       }}>
    //       <Text style={{color: '#fff'}}>CCC</Text>
    //     </TouchableOpacity>,
    //   ]}
    //   renderItem={({index}) => (
    //     <View style={{height: 50, backgroundColor: '#fff'}} />
    //   )}></TableView>
  );
};
export default Main;
