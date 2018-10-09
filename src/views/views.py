import aiohttp
from sanic.views import HTTPMethodView
from sanic.response import html, text
from jinja2 import Environment, PackageLoader, select_autoescape

# jiaja2 配置
env = Environment(
    loader=PackageLoader('views.routers', '../templates'),
    autoescape=select_autoescape(['html', 'xml', 'tpl']))


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


class JoinRoomPage(HTTPMethodView):
    """加入房间
    未下载：跳转到商城
    已下载：自动打开应用并进入房间
    """
    TEMPLATE_FILE = 'join_room.html'
    APP_STORE_URL = 'itms-apps://itunes.apple.com/cn/app/id1394482339?mt=8'
    DOUDIZHU_H5_URL = 'https://www.laiwan.io/doudizhu/?id={room_pin}'

    async def get(self, request, room_pin):
        return template(
            self.TEMPLATE_FILE,
            doudizhu_h5_url=self.DOUDIZHU_H5_URL.format(room_pin=room_pin),
            app_store_url=self.APP_STORE_URL,
            room_pin=room_pin)


class JoinDoudiZhuPage(HTTPMethodView):
    """加入房间
    暂时兼容 /doudizhu?id=xxxx 这样的跳转 url
    """
    TEMPLATE_FILE = 'join_room.html'
    APP_STORE_URL = 'itms-apps://itunes.apple.com/cn/app/id1394482339?mt=8'
    DOUDIZHU_H5_URL = 'https://www.laiwan.io/doudizhu/?id={room_pin}'

    async def get(self, request):
        room_pin = request.raw_args.get('id')
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
    # 内测版本
    NEICE_DOWNLOAD_URL = '#'

    ANDROID_DOWNLOAD_URL = 'https://laiwan.io/download/android.json'

    async def get(self, request):

        # 通过内部 api 获取最新的下载链接地址
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.ANDROID_DOWNLOAD_URL) as response:
                    result_json = await response.json()
                    android_download_url = result_json['result'][
                        'download_url']
        except Exception:
            android_download_url = '#'

        return template(
            self.TEMPLATE_FILE,
            ios_download_url=('itms-apps://itunes.apple.com'
                              '/cn/app/id1394482339'),
            android_download_url=android_download_url,
            google_download_url=self.GOOGLE_DOWNLOAD_URL,
            neice_download_url=self.NEICE_DOWNLOAD_URL)
