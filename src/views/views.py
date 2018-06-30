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
        return text(
            body=next(_template.generate()), content_type='application/json')


class JoinRoomPage(HTTPMethodView):
    """加入房间
    未下载：跳转到商城
    已下载：自动打开应用并进入房间
    """
    TEMPLATE_FILE = 'join_room.html'
    # app store 应用链接
    APP_STORE_URL = 'itms-apps://itunes.apple.com/cn/app/id1394482339?mt=8'
    # laiwan 下载链接
    QRCODE_DOWNLOAD_URL = 'https://www.laiwan.io/download'
    # apple-app-site-association 链接
    APPLE_APP_SITE_ASSOCIATION_WAKE_UP_APP_URL = \
        'https://apple-app-site-association.laiwan.io{request_path}'

    async def get(self, request, room_pin):
        return template(
            self.TEMPLATE_FILE,
            room_pin=room_pin,
            qrcode_download_url=self.QRCODE_DOWNLOAD_URL,
            app_store_url=self.APP_STORE_URL,
            apple_app_site_association_wake_up_app_url=self.
            APPLE_APP_SITE_ASSOCIATION_WAKE_UP_APP_URL.format(
                request_path=request.path))


class AddFriendPage(HTTPMethodView):
    """添加好友
    未下载：跳转到商城
    已下载：自动打开应用并添加该好友
    """
    TEMPLATE_FILE = 'add_friend.html'
    # app store 应用链接
    APP_STORE_URL = 'itms-apps://itunes.apple.com/cn/app/id1394482339?mt=8'
    # laiwan 下载链接
    QRCODE_DOWNLOAD_URL = 'https://www.laiwan.io/download'
    # apple-app-site-association 链接
    APPLE_APP_SITE_ASSOCIATION_WAKE_UP_APP_URL = \
        'https://apple-app-site-association.laiwan.io{request_path}'

    async def get(self, request, username):
        return template(
            self.TEMPLATE_FILE,
            username=username,
            qrcode_download_url=self.QRCODE_DOWNLOAD_URL,
            app_store_url=self.APP_STORE_URL,
            apple_app_site_association_wake_up_app_url=self.
            APPLE_APP_SITE_ASSOCIATION_WAKE_UP_APP_URL.format(
                request_path=request.path))
