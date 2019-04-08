from app import app
from views.routers import doc_blueprint, invitation_blueprint, home_blueprint

app.blueprint(doc_blueprint)
app.blueprint(invitation_blueprint)
app.blueprint(home_blueprint)


def run_server():
    """启动服务器
    """
    app.run(host=app.config.HOST,
            port=app.config.PORT,
            workers=app.config.WORKERS,
            debug=app.config.DEBUG)
