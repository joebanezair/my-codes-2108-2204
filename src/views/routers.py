from sanic import Blueprint

# 用户协议、隐私政策
doc_blueprint = Blueprint('doc')
doc_blueprint.static('/privacy.html', '/opt/app/doc/privacy.html')
doc_blueprint.static('/agreement.html', '/opt/app/doc/agreement.html')
