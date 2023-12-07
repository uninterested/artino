import {StyleSheet} from 'react-native';
import {hp, wp} from '~/utils/responsive';
import {KButtonHeight} from '../config';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  coverImg: {
    height: hp(35),
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1,
  },
  carousel: {
    width: wp(100),
    height: wp(110),
    zIndex: 100,
    elevation: 1,
  },
  card: {
    borderRadius: wp(25),
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  box: {
    margin: 20,
    marginBottom: 0,
  },
  icon: {
    width: wp(50) - 40,
    height: wp(50) - 40,
    borderRadius: (wp(50) - 40) * 0.5,
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
    height: KButtonHeight,
    borderRadius: 24,
    position: 'absolute',
    bottom: 0,
    paddingTop: 0,
    left: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
