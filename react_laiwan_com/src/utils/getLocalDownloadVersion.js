
export default function getLocalDownlownVersion(url = '') {
    if (!url) {
        return '';
    }
    let version = '';
    const firstIndex = url.lastIndexOf('/');
    const secondIndex = url.lastIndexOf('.');
    version = url.substring(firstIndex + 1, secondIndex);
    return version;
};