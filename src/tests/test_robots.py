class TestRobots:
    async def test_get_robots1(self, client):
        headers = {"Host": "laiwan.io"}
        response1 = await client.get('/robots.txt', headers=headers)
        assert response1.status == 200
        text = await response1.text()
        assert text == f'User-agent: *\nDisallow:\n'

    async def test_get_robots2(self, client):
        headers = {"Host": "shafayouxi.org"}
        response2 = await client.get('/robots.txt', headers=headers)
        assert response2.status == 200
        text = await response2.text()

        assert text == f'User-agent: *\nDisallow: /\n'
