import {
    CreateParticipantDto,
    UpdateParticipantDto,
} from 'src/participant/dto';

export function participantTest(pactum) {
    describe('participants', () => {
        const createDto: CreateParticipantDto = {
            email: 'participants@test.test',
            campaignId: null,
        };

        const updateDto: UpdateParticipantDto = {
            name: 'new participants name',
        };

        it('should not create with empty body', () => {
            return pactum
                .spec()
                .post('/participants')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({})
                .expectStatus(400);
        });

        it('should create with correct dto', () => {
            return pactum
                .spec()
                .post('/participants')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({
                    ...createDto,
                    campaignId: '$S{testCampaignId}',
                })
                .expectStatus(201)
                .stores('participantsId', 'id');
        });

        it('should show all', () => {
            return pactum
                .spec()
                .get('/participants')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });

        it('should not show 1 with incorrect param', () => {
            return pactum
                .spec()
                .get('/participants/666')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(404);
        });

        it('should show 1 with correct param', () => {
            return pactum
                .spec()
                .get('/participants/$S{participantsId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });

        it('should update', () => {
            return pactum
                .spec()
                .put('/participants/$S{participantsId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody(updateDto)
                .expectStatus(200);
        });

        it('should delete', () => {
            return pactum
                .spec()
                .delete('/participants/$S{participantsId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });
    });
}
