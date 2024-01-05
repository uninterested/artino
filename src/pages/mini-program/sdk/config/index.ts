import {Platform} from 'react-native';
import FNFetchBlob from 'react-native-fetch-blob';

export const filePrefix = Platform.OS === 'ios' ? '' : 'file://';

// 本地Path
export const localPath = (options: POJO) =>
  `${filePrefix}${FNFetchBlob.fs.dirs.CacheDir}/${options.appId}/${options.type}/usr`;
// 协议名
export const protocalPath = 'artinofile://usr';

/**
 * 文件目录处理
 * @param path 路径
 * @param encode 解析方式 encode【absolute转文件协议】 decode【文件协议转absolute】
 */
export const filePathResolve = (
  path: string,
  encode: boolean,
  options: POJO,
) => {
  if (encode) {
    return path.replace(localPath(options), protocalPath);
  } else {
    return path.replace(protocalPath, localPath(options));
  }
};
