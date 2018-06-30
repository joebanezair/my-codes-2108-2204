import pytest
from sanic.server import HttpProtocol

from app.server import app as sanic_app


@pytest.yield_fixture
def app():
    yield sanic_app


@pytest.fixture
def client(loop, app, test_client):
    return loop.run_until_complete(test_client(app, protocol=HttpProtocol))


class TestStaticUrl:
    async def test_get_agreement(self, client):
        response1 = await client.get('/agreement.html')
        assert response1.status == 200

    async def test_get_privacy(self, client):
        response2 = await client.get('/privacy.html')
        assert response2.status == 200
