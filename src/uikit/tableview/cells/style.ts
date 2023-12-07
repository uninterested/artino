import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
  },
  detailTitle: {
    flex: 1,
    fontSize: 13,
    textAlign: 'right',
  },
  line: {
    height: 0.5,
    backgroundColor: 'rgba(160,160,160,0.3)',
    bottom: 0,
    position: 'absolute',
    left: 15,
  },
  arrow: {
    fontSize: 14,
  },
});
