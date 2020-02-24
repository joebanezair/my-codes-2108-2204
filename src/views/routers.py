from sanic import Blueprint

from views import views

# 用户协议、隐私政策
doc_blueprint = Blueprint('doc')
doc_blueprint.static('/privacy.html', '/opt/app/doc/privacy.html')
doc_blueprint.static('/agreement.html', '/opt/app/doc/agreement.html')
doc_blueprint.add_route(views.RobotsView.as_view(),
                        '/robots.txt',
                        methods=['GET'])

# 来玩的 邀请链接、分享链接
invitation_blueprint = Blueprint('invitation')
invitation_blueprint.static('/static/css', '/opt/app/static/css')
invitation_blueprint.static('/static/img', '/opt/app/static/img')

# https://stackoverflow.com/questions/42370867/configure-apple-app-site-association-file-and-upload-on-server
# 让 apple-app-site-association 文件通过这两个 url 都可以被获取
invitation_blueprint.add_route(views.AppleAppSiteAssociation.as_view(),
                               '/apple-app-site-association',
                               methods=['GET'])
invitation_blueprint.add_route(views.AppleAppSiteAssociation.as_view(),
                               '/.well-known/apple-app-site-association',
                               methods=['GET'])
invitation_blueprint.add_route(views.JoinDoudiZhuPage.as_view(),
                               '/doudizhu/room',
                               methods=['GET'])
invitation_blueprint.add_route(views.JoinTexasHoldemPage.as_view(),
                               '/texas/room',
                               methods=['GET'])

# 首页
home_blueprint = Blueprint('home')
home_blueprint.add_route(views.HomePage.as_view(), '/', methods=['GET'])
home_blueprint.add_route(views.AppealFile.as_view(),
                         '/tencent1091602168595806649.txt',
                         methods=['GET'])

# 游戏商城
home_blueprint.add_route(views.GameMallPage.as_view(),
                         '/mall',
                         methods=['GET'])

# mobile页面
home_blueprint.add_route(views.AppMobileView.as_view(),
                         '/mobile',
                         methods=['GET'])

# 用户支持页面
home_blueprint.add_route(views.AppSupportView.as_view(),
                         '/support',
                         methods=['GET'])
