import {StyleSheet} from 'react-native';
import {wp} from '~/utils/responsive';

export default StyleSheet.create({
  mask: {
    flex: 1,
    zIndex: 100,
    ...StyleSheet.absoluteFillObject,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    maxWidth: wp(80),
    minWidth: wp(65),
    borderRadius: 6,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    marginHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 20,
  },
  footer: {
    marginTop: 15,
    borderTopWidth: 0.5,
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  btnH: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnV: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
  },
  lineH: {
    width: 0.5,
    height: '100%',
  },
  lineV: {
    height: 0.5,
    width: '100%',
  },
  input: {
    fontSize: 13,
    padding: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 4,
  },
});
