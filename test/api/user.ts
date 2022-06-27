export function userTest(pactum) {
    describe('users', () => {
        it('should not get user with incorrect access token', () => {
            return pactum
                .spec()
                .get('/users/me')
                .withHeaders({
                    Authorization: 'Bearer notoken',
                })
                .expectStatus(401);
        });

        it('should get user with correct access token', () => {
            return pactum
                .spec()
                .get('/users/me')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });
    });
}
