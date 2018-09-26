class TestStaticUrl:
    async def test_get_agreement(self, client):
        response1 = await client.get('/agreement.html')
        assert response1.status == 200

    async def test_get_privacy(self, client):
        response2 = await client.get('/privacy.html')
        assert response2.status == 200
