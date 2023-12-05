import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  detailTitle: {
    flex: 1,
    color: 'rgb(124,125,131)',
    fontSize: 13,
    textAlign: 'right',
  },
  line: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: 0,
    position: 'absolute',
    left: 15,
  },
  arrow: {
    fontSize: 14,
  },
});
