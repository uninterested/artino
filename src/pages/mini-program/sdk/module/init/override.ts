const originPostMessage = `var originPostMessage = window.ReactNativeWebView.postMessage;
window.ReactNativeWebView.postMessage = undefined;
var originEval = window.eval;
window.eval = undefined;
`;

const patch = `
window.fetch = function() {
    throw new Error("fetch is unsupport");
};
window.confirm = function() {
    throw new Error("confirm is unsupport");
};
// window.alert = function() {
//     throw new Error("alert is unsupport");
// };
window.console = {
    log: function() {
        var args = Array.prototype.slice.call(arguments);
        postMessage(buildArgs("log", args), "*");
    },
    error: function() {
        var args = Array.prototype.slice.call(arguments);
        postMessage(buildArgs("error", args), "*");
    },
    warn: function() {
        var args = Array.prototype.slice.call(arguments);
        postMessage(buildArgs("warn", args), "*");
    }
}
`;

export default `
${originPostMessage}
${patch}
`;
