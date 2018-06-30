import pytest
from sanic.server import HttpProtocol

from app.server import app as sanic_app


@pytest.yield_fixture
def app():
    yield sanic_app


@pytest.fixture
def client(loop, app, test_client):
    return loop.run_until_complete(test_client(app, protocol=HttpProtocol))
