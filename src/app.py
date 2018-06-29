from sanic import Sanic

server = Sanic()

server.static('/', '/opt/app/doc')
server.static('/doc', '/opt/app/doc')

if __name__ == "__main__":
    server.run('0.0.0.0', 8000)
