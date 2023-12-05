import { StyleSheet } from 'react-native'

const kWidth: number = 52
const kHeight: number = 30

export default StyleSheet.create({
  container: {
    borderRadius: kHeight / 2,
  },
  animatedView: {
    borderRadius: kHeight / 2,
    width: kWidth,
    height: kHeight,
    overflow: 'hidden',
  },
  ball: {
    width: kHeight,
    height: kHeight,
    borderRadius: kHeight / 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
  },
})