import {helper} from './module/init/help';
import {handleMessage} from './handle/utils';
import promise from './module/init/promise';
import override from './module/init/override';
import network from './module/network';
import toast from './module/toast';

//#region init sdk
const buildMethods = () => {
  const methods: POJO = {
    ...network,
    ...toast,
  };
  return `
window.AT = {
    ${Object.keys(methods)
      .map(key => `${key}: ${methods[key]}`)
      .join(',\n\t')}
};`;
};
const sdk = `"use strict";
${helper}
${override}
${buildMethods()}
${promise}`;

//#endregion

export {handleMessage, promise};

export const disableLongPress = `
var style = document.createElement('style');
style.type = 'text/css';
var cssContent = document.createTextNode('body{-webkit-user-select:none;-webkit-user-drag:none;}');
style.appendChild(cssContent);
document.body.appendChild(style);
document.oncontextmenu=function(e){
  e.preventDefault();
};`;

export default sdk;
