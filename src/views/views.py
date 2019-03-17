import aiohttp
import logging
from sanic.views import HTTPMethodView
from sanic.response import html, text
from jinja2 import Environment, PackageLoader, select_autoescape
from urllib.parse import urlparse

# jiaja2 配置
env = Environment(
    loader=PackageLoader('views.routers', '../templates'),
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


class AppSupportView(HTTPMethodView):
    """用户支持页面
    """

    async def get(self, request, **kwargs):
        return template(
            'support.html',
            support_qq='2543775150',
            support_qq_group='576398409',
            support_wechat='laiwankefu',
        )


class HomePage(HTTPMethodView):
    """首页
    """
    TEMPLATE_FILE = 'home.html'

    GOOGLE_DOWNLOAD_URL = ('https://play.google.com'
                           '/store/apps/details?id=com.ac.laiwan')

    ANDROID_DOWNLOAD_URI = 'https://{host}/download/android.json'
    IOS_DOWNLOAD_URI = 'https://{host}/download/ios.json'
    CDN_DOMAIN = 'http://app.production.laiwan.shafayouxi.com'

    async def get_ios_download_url(self, request):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.IOS_DOWNLOAD_URI.format(
                            host=request.host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            # 获取不到下载地址，主页点击下载链接的时候，不跳转
            return ''

    async def get_android_url(self, request):
        # 通过内部 api 获取最新的下载链接地址
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                        self.ANDROID_DOWNLOAD_URI.format(
                            host=request.host)) as response:
                    result_json = await response.json()
            return result_json['result']['download_url']
        except Exception as e:
            logger.error('Can not get latest downlaod info', exc_info=e)
            return ''

    async def get(self, request):
        ios_download_url = await self.get_ios_download_url(request)

        # staging 上，ios 下载指向企业版
        if request.app.config.ENV == 'staging':
            qrcode_path = '/static/img/qrcode_staging.png'
        else:
            qrcode_path = '/static/img/qrcode_production.png'
            ios_download_url = ('itms-apps://itunes.apple.com'
                                '/cn/app/id1394482339')
        android_download_old_url = await self.get_android_url(request)
        if "shafayouxi.org" in request.host:
            self.CDN_DOMAIN = 'http://app.staging.laiwan.shafayouxi.com'
        android_download_cdn_url = self.CDN_DOMAIN + \
            urlparse(android_download_old_url).path

        return template(
            self.TEMPLATE_FILE,
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
            rule = 'Disallow'
        else:
            rule = 'Allow'
        return text(f'User-agent: *\n{rule}: /')
