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


class HomePage(HTTPMethodView):
    """首页
    """
    TEMPLATE_FILE = 'home.html'

    IOS_DOWNLOAD_URL = 'itms-apps://itunes.apple.com/cn/app/id1394482339?mt=8'
    ANDROID_DOWNLOAD_URL = '#'
    GOOGLE_DOWNLOAD_URL = '#'
    NEICE_DOWNLOAD_URL = '#'

    async def get(self, request):
        return template(
            self.TEMPLATE_FILE,
            ios_download_url=self.IOS_DOWNLOAD_URL,
            android_download_url=self.ANDROID_DOWNLOAD_URL,
            google_download_url=self.GOOGLE_DOWNLOAD_URL,
            neice_download_url=self.NEICE_DOWNLOAD_URL)
