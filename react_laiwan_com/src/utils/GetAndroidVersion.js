export default function getAndroidVersion() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const versionInfo = userAgent.match(/android [\d._]+/gi);
    const version = (`${versionInfo}`).replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
    return version;
}
