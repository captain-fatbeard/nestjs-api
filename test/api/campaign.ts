import { CreateCampaignDto, UpdateCampaignDto } from 'src/campaign/dto';

export function campaignTest(pactum) {
    describe('campaigns', () => {
        const createDto: CreateCampaignDto = {
            name: 'campaign name',
            is_published: true,
            is_template: true,
            clientId: 1,
            userId: 1,
        };
        const updateDto: UpdateCampaignDto = {
            name: 'new campaign name',
        };

        it('should not create with empty body', () => {
            return pactum
                .spec()
                .post('/campaigns')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({})
                .expectStatus(400);
        });
        it('should create with correct dto', () => {
            return pactum
                .spec()
                .post('/campaigns')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody(createDto)
                .expectStatus(201)
                .stores('campaignId', 'id');
        });

        // it('should show all', () => {
        //     return pactum
        //         .spec()
        //         .get('/campaigns')
        //         .withHeaders({
        //             Authorization: 'Bearer $S{userAt}',
        //         })
        //         .expectStatus(200);
        // });
        // it('should not show 1 with incorrect param', () => {
        //     return pactum
        //         .spec()
        //         .get('/campaigns/666')
        //         .withHeaders({
        //             Authorization: 'Bearer $S{userAt}',
        //         })
        //         .expectStatus(404);
        // });
        // it('should show 1 with correct param', () => {
        //     return pactum
        //         .spec()
        //         .get('/campaigns/$S{campaignId}')
        //         .withHeaders({
        //             Authorization: 'Bearer $S{userAt}',
        //         })
        //         .expectStatus(200);
        // });
        // it('should update', () => {
        //     return pactum
        //         .spec()
        //         .put('/campaigns/$S{campaignId}')
        //         .withHeaders({
        //             Authorization: 'Bearer $S{userAt}',
        //         })
        //         .withBody(updateDto)
        //         .expectStatus(200);
        // });
        // it('should delete', () => {
        //     return pactum
        //         .spec()
        //         .delete('/campaigns/$S{campaignId}')
        //         .withHeaders({
        //             Authorization: 'Bearer $S{userAt}',
        //         })
        //         .expectStatus(200);
        // });
    });
}
