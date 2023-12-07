import {StyleSheet} from 'react-native';
import {wp} from '~/utils/responsive';
import {KButtonHeight} from '../config';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
  },
  clear: {
    flex: 1,
    overflow: 'visible',
  },
  iconWrap: {
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
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
  topOffsetNormal: {
    marginTop: 10,
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
    left: 10,
    right: 10,
    overflow: 'hidden',
  },
  bookText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollview: {
    backgroundColor: 'transparent',
    minHeight: '100%',
  },
  body: {
    paddingHorizontal: 16,
    width: wp(100),
  },
  cast: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actorMask: {
    marginRight: wp(4),
  },
  radius: {
    borderRadius: 10,
  },
  actor: {
    width: wp(32),
    height: wp(32),
  },
  actorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoWrap: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 28,
  },
  detail: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  story: {
    fontSize: 12,
    lineHeight: 18,
  },
});
