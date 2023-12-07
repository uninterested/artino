import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  container: {
    padding: 20,
    position: 'absolute',
    overflow: 'hidden',
  },
  clear: {
    flex: 1,
    overflow: 'visible',
  },
  iconWrap: {
    backgroundColor: 'transparent',
  },
  icon: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topOffset: {
    marginTop: 14,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    fontSize: 15,
    marginHorizontal: 4,
  },
  type: {
    fontSize: 11,
    lineHeight: 22,
    paddingHorizontal: 8,
    borderRadius: 13,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  book: {
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    bottom: 0,
    paddingTop: 0,
    left: 30,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
