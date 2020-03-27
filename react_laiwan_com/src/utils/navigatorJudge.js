const userAgent = window.navigator.userAgent.toLocaleLowerCase();
export const isMobile = () => {
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        // window.location = '/mobile';
        return true;
    }
    return false;
};

export const isWeChat = () => {
    if (userAgent.indexOf('micromessenger') !== -1) {
        return true;
    }
    return false;
};
