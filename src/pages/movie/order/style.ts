import {StyleSheet} from 'react-native';
import {hp, wp} from '~/utils/responsive';
import {KButtonHeight} from '../config';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: wp(100),
    height: hp(35),
    position: 'absolute',
    left: 0,
    top: 0,
  },
  row: {
    flexDirection: 'row',
  },
  topOffset: {
    marginTop: 14,
  },
  topNormal: {
    marginTop: 44,
  },
  dateWrap: {
    justifyContent: 'space-between',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  date: {
    width: wp(100),
    height: hp(83),
    zIndex: 2,
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 12,
  },
  scrollview: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  video: {
    height: (wp(100) - 24) * 0.55,
    width: wp(100) - 24,
  },
  videoPlus: {
    height: wp(70) * 0.55,
    width: wp(70),
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateIcon: {
    fontSize: 16,
  },
  ym: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  dateView: {
    borderRadius: wp(11) * 0.5,
    overflow: 'hidden',
  },
  dateItem: {
    width: wp(11),
    height: wp(11) * 1.8,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  week: {
    fontSize: 12,
    fontWeight: '500',
  },
  split: {
    height: 2,
    width: '100%',
    borderRadius: 1,
    transform: [{scale: 0.5}],
  },
  day: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeItem: {
    width: wp(13),
    height: wp(13) * 0.45,
  },
  time: {
    fontSize: 12,
  },
  book: {
    height: KButtonHeight,
    borderRadius: KButtonHeight * 0.5,
  },
  bookText: {
    fontSize: 14,
    fontWeight: '600',
  },
  seatText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
  seatWrap: {
    width: wp(100) - 24,
    height: 160,
  },
  seat: {
    fontSize: 24,
  },
  seatElem: {
    width: 44,
    height: 40,
  },
});
