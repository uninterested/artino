import {Dimensions, PixelRatio} from 'react-native';
import {protocalPath} from '../../config';

const {width, height} = Dimensions.get('screen');
const pixelRatio = PixelRatio.get();

// @ts-nocheck
export default (insert: POJO) => ({
  env: JSON.stringify({USER_DATA_PATH: protocalPath}),
  getWindowInfo: `function () {
        return {
            pixelRatio: ${pixelRatio},
            safeArea: {
                top: ${insert.top},
                bottom: ${insert.bottom}
            },
            screenHeight: ${height},
            screenWidth: ${width}
        };
    }`,
});
