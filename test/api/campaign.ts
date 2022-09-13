import { CreateCampaignDto, UpdateCampaignDto } from 'src/campaign/dto';
import { CreateFieldDto } from 'src/field/dto/createField.dto';

export function campaignTest(pactum) {
    describe('campaigns', () => {
        const campaignDto: CreateCampaignDto = {
            name: 'campaign name',
            isPublished: true,
            isTemplate: true,
            clientId: null,
            userId: null,
        };

        const settingDto: CreateFieldDto[] = [
            {
                container: 'default',
                type: 'text',
                name: 'setting',
                label: 'setting',
                value: 'default text',
            },
        ];

        const contentDto: CreateFieldDto[] = [
            {
                container: 'default',
                type: 'text',
                name: 'content',
                label: 'content',
                value: 'default text',
            },
        ];

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
                .withBody({
                    ...campaignDto,
                    clientId: '$S{clientId}',
                    userId: '$S{userId}',
                })
                .expectStatus(201)
                .stores('campaignId', 'id');
        });

        it('should create with settings', () => {
            return pactum
                .spec()
                .post('/campaigns')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({
                    ...campaignDto,
                    name: 'with setting fields',
                    clientId: '$S{clientId}',
                    userId: '$S{userId}',
                    settings: settingDto,
                })
                .expectStatus(201);
        });

        it('should create with content', () => {
            return pactum
                .spec()
                .post('/campaigns')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({
                    ...campaignDto,
                    name: 'with content fields',
                    clientId: '$S{clientId}',
                    userId: '$S{userId}',
                    content: contentDto,
                })
                .expectStatus(201)
                .stores('campaignWithContentId', 'id');
        });

        it('should create with settings and content', () => {
            return pactum
                .spec()
                .post('/campaigns')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({
                    ...campaignDto,
                    name: 'with setting fields',
                    clientId: '$S{clientId}',
                    userId: '$S{userId}',
                    settings: settingDto,
                    content: contentDto,
                })
                .expectStatus(201);
        });

        it('should show all', () => {
            return pactum
                .spec()
                .get('/campaigns')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });

        it('should not show 1 with incorrect param', () => {
            return pactum
                .spec()
                .get('/campaigns/666')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(404);
        });

        it('should show 1 with correct param', () => {
            return pactum
                .spec()
                .get('/campaigns/$S{campaignId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });

        it('should update', () => {
            return pactum
                .spec()
                .put('/campaigns/$S{campaignId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody(updateDto)
                .expectStatus(200);
        });

        it('should update with setting and content', () => {
            return pactum
                .spec()
                .put('/campaigns/$S{campaignWithContentId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .withBody({
                    ...updateDto,
                    settings: settingDto,
                    content: contentDto,
                })
                .expectStatus(200);
        });

        it('should delete', () => {
            return pactum
                .spec()
                .delete('/campaigns/$S{campaignId}')
                .withHeaders({
                    Authorization: 'Bearer $S{userAt}',
                })
                .expectStatus(200);
        });
    });
}
