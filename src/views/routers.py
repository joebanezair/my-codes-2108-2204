from sanic import Blueprint

from views import views

# 用户协议、隐私政策
doc_blueprint = Blueprint('doc')
doc_blueprint.static('/privacy.html', '/opt/app/doc/privacy.html')
doc_blueprint.static('/agreement.html', '/opt/app/doc/agreement.html')

# 来玩的 邀请链接、分享链接
invitation_blueprint = Blueprint('invitation')
invitation_blueprint.static('/static/css', '/opt/app/static/css')
invitation_blueprint.static('/static/img', '/opt/app/static/img')
invitation_blueprint.add_route(
    views.AppleAppSiteAssociation.as_view(),
    '/apple-app-site-association',
    methods=['GET'])
invitation_blueprint.add_route(
    views.JoinRoomPage.as_view(), '/room/<room_pin>', methods=['GET'])
invitation_blueprint.add_route(
    views.JoinDoudiZhuPage.as_view(), '/doudizhu', methods=['GET'])

# 首页
home_blueprint = Blueprint('home')
home_blueprint.add_route(views.HomePage.as_view(), '/', methods=['GET'])

# 用户支持页面
home_blueprint.add_route(
    views.AppSupportView.as_view(), '/support', methods=['GET'])
