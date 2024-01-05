import {helper} from './module/init/help';
import {handleMessage} from './handle/utils';
import promise from './module/init/promise';
import override from './module/init/override';
import network from './module/network';
import toast from './module/toast';
import base from './module/base';

export {handleMessage, promise};

//#region disable long press
export const inject = `"use strict";
var style = document.createElement('style');
style.type = 'text/css';
var cssContent = document.createTextNode('body{-webkit-user-select:none;-webkit-user-drag:none !important;}');
style.appendChild(cssContent);
document.body.appendChild(style);

document.oncontextmenu=function(e){
  e.preventDefault();
};

${promise}
`;

//#endregion

//#region init sdk
export default (insert: POJO) => {
  const buildMethods = () => {
    const methods: POJO = {
      ...network,
      ...toast,
      ...base(insert),
    };
    return `
  window.AT = {
      ${Object.keys(methods)
        .map(key => `${key}: ${methods[key]}`)
        .join(',\n\t')}
  };`;
  };
  return `"use strict";
  ${helper}
  ${override}
  ${buildMethods()}`;
};
//#endregion
