import {helper, handleMessage} from './help';
import promise from './promise';
import override from './override';
import inject from './inject';

const sdk = `"use strict";
${helper}
${override}
${inject}
`;

export {handleMessage, promise};

export default sdk;
