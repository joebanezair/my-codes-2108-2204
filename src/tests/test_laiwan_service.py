class TestLaiwan:
    async def test_get_apple_app_site_association(self, client):
        response1 = await client.get('/apple-app-site-association')
        assert response1.status == 200

    async def test_join_room(self, client):
        response2 = await client.get('/room/12345')
        assert response2.status == 200
