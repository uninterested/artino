import {StyleSheet} from 'react-native';
import {hp, wp} from '~/utils/responsive';

export default StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp(100),
    height: hp(100),
    zIndex: 999999,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  toast: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    marginHorizontal: 30,
    marginTop: 10,
  },
  message: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
});
