import {PixelRatio, Dimensions} from 'react-native';

export type TPercent = number | `${number}%`;

const {width, height} = Dimensions.get('window');

/**
 * width percent
 * @param widthPercent
 * @returns
 */
export const wp = (widthPercent: TPercent) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

/**
 * height percent
 * @param heightPercent
 * @returns
 */
export const hp = (heightPercent: TPercent) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};
