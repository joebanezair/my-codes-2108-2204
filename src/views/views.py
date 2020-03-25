import aiohttp
import logging
from sanic.views import HTTPMethodView
from sanic.response import html, text
from jinja2 import Environment, PackageLoader, select_autoescape
from urllib.parse import urlparse

# jiaja2 配置
env = Environment(loader=PackageLoader('views.routers', '../templates'),
                  autoescape=select_autoescape(['html', 'xml', 'tpl']))

logger = logging.getLogger('root')


def template(tpl, **kwargs):
    _template = env.get_template(tpl)
    return html(_template.render(kwargs))


class AppleAppSiteAssociation(HTTPMethodView):
    """apple universal link
    """
    APPLE_APP_SITE_ASSOCIATION__FILE = 'apple-app-site-association'

    async def get(self, request):
        _template = env.get_template(self.APPLE_APP_SITE_ASSOCIATION__FILE)
        return text(body=_template.render(), content_type='application/json')


class JoinDoudiZhuPage(HTTPMethodView):
    """加入房间
    """
    TEMPLATE_FILE = 'join_room.html'
    APP_STORE_URL = 'itms-apps://itunes.apple.com/app/id1394482339?mt=8'
    DOUDIZHU_H5_URL = 'https://www.laiwan.io/download'

    async def get(self, request):
        room_pin = request.raw_args.get('pin')
        return template(
            self.TEMPLATE_FILE,
            doudizhu_h5_url=self.DOUDIZHU_H5_URL.format(room_pin=room_pin),
            app_store_url=self.APP_STORE_URL,
            room_pin=room_pin)


class JoinTexasHoldemPage(HTTPMethodView):
    """加入房间
    """
    TEMPLATE_FILE = 'join_room.html'
    APP_STORE_URL = 'itms-apps://itunes.apple.com/cn/app/id1394482339?mt=8'
    DOUDIZHU_H5_URL = 'https://www.laiwan.io/download'

    async def get(self, request):
        room_pin = request.raw_args.get('pin')
        return template(
            self.TEMPLATE_FILE,
            doudizhu_h5_url=self.DOUDIZHU_H5_URL.format(room_pin=room_pin),
            app_store_url=self.APP_STORE_URL,
            room_pin=room_pin)


class AppMobileView(HTTPMethodView):
    """mobile
    """
    TEMPLATE_FILE = 'mobile.html'

    GOOGLE_DOWNLOAD_URL = ('https://play.google.com'
                           '/store/apps/details?id=com.ac.laiwan')

    ANDROID_DOWNLOAD_URI = '{host}/download/android.json'
    IOS_DOWNLOAD_URI = '{host}/download/ios.json'

    async def get_ios_download_url(self, host):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.IOS_DOWNLOAD_URI.format(host=host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            # 获取不到下载地址，主页点击下载链接的时候，不跳转
            return ''

    async def get_android_url(self, host):
        # 通过内部 api 获取最新的下载链接地址
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.ANDROID_DOWNLOAD_URI.format(
                            host=host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            return ''

    async def get(self, request):
        # staging 上，ios 下载指向企业版
        if request.app.config.ENV == 'staging':
            host = 'https://shafayouxi.org'
            ios_download_url = await self.get_ios_download_url(host)
            cdn_domain = 'https://app.staging.laiwan.shafayouxi.com'
        else:
            host = 'https://laiwan.io'
            ios_download_url = ('itms-apps://itunes.apple.com'
                                '/cn/app/id1394482339')
            cdn_domain = 'https://app.production.laiwan.shafayouxi.com'

        android_download_old_url = await self.get_android_url(host)
        android_download_cdn_url = cdn_domain + \
            urlparse(android_download_old_url).path

        return template(self.TEMPLATE_FILE,
                        ios_download_url=ios_download_url,
                        android_download_url=android_download_cdn_url,
                        google_download_url=self.GOOGLE_DOWNLOAD_URL)


class GameMallPage(HTTPMethodView):
    """游戏商城
    """
    TEMPLATE_FILE = 'mall.html'

    async def get(self, request):
        return template(self.TEMPLATE_FILE)


class HomePage(HTTPMethodView):
    """首页
    """
    TEMPLATE_FILE = 'home.html'

    GOOGLE_DOWNLOAD_URL = ('https://play.google.com'
                           '/store/apps/details?id=com.ac.laiwan')

    ANDROID_DOWNLOAD_URI = '{host}/download/android.json'
    IOS_DOWNLOAD_URI = '{host}/download/ios.json'

    async def get_ios_download_url(self, host):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.IOS_DOWNLOAD_URI.format(host=host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            # 获取不到下载地址，主页点击下载链接的时候，不跳转
            return ''

    async def get_android_url(self, host):
        # 通过内部 api 获取最新的下载链接地址
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.ANDROID_DOWNLOAD_URI.format(
                            host=host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            return ''

    async def get(self, request):
        # staging 上，ios 下载指向企业版
        if request.app.config.ENV == 'staging':
            qrcode_path = '/static/img/qrcode_staging.png'
            host = 'https://shafayouxi.org'
            ios_download_url = await self.get_ios_download_url(host)
            cdn_domain = 'https://app.staging.laiwan.shafayouxi.com'
        else:
            qrcode_path = '/static/img/qrcode_production.png'
            host = 'https://laiwan.io'
            ios_download_url = ('itms-apps://itunes.apple.com'
                                '/cn/app/id1394482339')
            cdn_domain = 'https://app.production.laiwan.shafayouxi.com'

        android_download_old_url = await self.get_android_url(host)
        android_download_cdn_url = cdn_domain + \
            urlparse(android_download_old_url).path

        return template(self.TEMPLATE_FILE,
                        ios_download_url=ios_download_url,
                        android_download_url=android_download_cdn_url,
                        google_download_url=self.GOOGLE_DOWNLOAD_URL,
                        qrcode_path=qrcode_path)


class RobotsView(HTTPMethodView):
    """robots.txt
    """
    async def get(self, request):
        # 判断站点
        if request.host == 'shafayouxi.org':
            return text("User-agent: *\nDisallow: /\n")
        else:
            return text('User-agent: *\nDisallow:\n')


class AppealFile(HTTPMethodView):
    async def get(self, request):
        return text('676733200703562368')


class AppSupportView(HTTPMethodView):
    """用户支持页面
    """
    async def get(self, request, **kwargs):
        return template('support.html')


class ShareView(HTTPMethodView):
    """分享页面
    """
    TEMPLATE_FILE = 'share.html'

    GOOGLE_DOWNLOAD_URL = ('https://play.google.com'
                           '/store/apps/details?id=com.ac.laiwan')

    ANDROID_DOWNLOAD_URI = '{host}/download/android.json'
    IOS_DOWNLOAD_URI = '{host}/download/ios.json'

    async def get_ios_download_url(self, host):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.IOS_DOWNLOAD_URI.format(host=host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            # 获取不到下载地址，主页点击下载链接的时候，不跳转
            return ''

    async def get_android_url(self, host):
        # 通过内部 api 获取最新的下载链接地址
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.ANDROID_DOWNLOAD_URI.format(
                            host=host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            return ''

    async def get(self, request):
        # staging 上，ios 下载指向企业版
        if request.app.config.ENV == 'staging':
            qrcode_path = '/static/img/qrcode_staging.png'
            host = 'https://shafayouxi.org'
            ios_download_url = await self.get_ios_download_url(host)
            cdn_domain = 'https://app.staging.laiwan.shafayouxi.com'
        else:
            qrcode_path = '/static/img/qrcode_production.png'
            host = 'https://laiwan.io'
            ios_download_url = ('itms-apps://itunes.apple.com'
                                '/cn/app/id1394482339')
            cdn_domain = 'https://app.production.laiwan.shafayouxi.com'

        android_download_old_url = await self.get_android_url(host)
        android_download_cdn_url = cdn_domain + \
            urlparse(android_download_old_url).path

        return template(self.TEMPLATE_FILE,
                        ios_download_url=ios_download_url,
                        android_download_url=android_download_cdn_url,
                        google_download_url=self.GOOGLE_DOWNLOAD_URL,
                        qrcode_path=qrcode_path)
