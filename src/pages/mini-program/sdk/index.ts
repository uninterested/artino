import {helper, handleMessage} from './sub/help';
import promise from './sub/promise';
import override from './sub/override';
import inject from './sub/inject';

const sdk = `"use strict";
${helper}
${override}
${inject}`;

export {handleMessage, promise};

export default sdk;
