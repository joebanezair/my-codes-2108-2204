const userAgent = window.navigator.userAgent.toLocaleLowerCase();
export default class NavigatorJudge {
    static isMobile() {
        if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
            return true;
        }
        return false;
    }

    static isWeChat() {
        if (userAgent.indexOf('micromessenger') !== -1) {
            return true;
        }
        return false;
    }
}
