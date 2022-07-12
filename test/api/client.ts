import { CreateClientDto, UpdateClientDto } from 'src/client/dto';

export function clientTest(pactum) {
    describe('clients', () => {
        const createDto: CreateClientDto = {
            name: 'client name',
        };
        const updateDto: UpdateClientDto = {
            name: 'new client name',
        };

        it('should not create with empty body', () => {
            return pactum
                .spec()
                .post('/clients')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({})
                .expectStatus(400);
        });
        it('should create with correct dto', () => {
            return pactum
                .spec()
                .post('/clients')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody(createDto)
                .expectStatus(201)
                .stores('clientId', 'id');
        });
        it('should show all', () => {
            return pactum
                .spec()
                .get('/clients')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });
        it('should not show 1 with incorrect param', () => {
            return pactum
                .spec()
                .get('/clients/666')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(404);
        });
        it('should show 1 with correct param', () => {
            return pactum
                .spec()
                .get('/clients/$S{clientId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });
        it('should update', () => {
            return pactum
                .spec()
                .put('/clients/$S{clientId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody(updateDto)
                .expectStatus(200);
        });
        it('should delete', () => {
            return pactum
                .spec()
                .delete('/clients/$S{clientId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });
    });
}
