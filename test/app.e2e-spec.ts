import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { authTest, campaignTest, clientTest, userTest } from './api';

describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );

        await app.init();

        await app.listen(3333);

        prisma = app.get(PrismaService);

        await prisma.cleanDB();

        pactum.request.setBaseUrl('http://localhost:3333');
    });

    afterAll(() => {
        app.close();
    });

    // create persistant user to use in tests
    it('should create test user', () => {
        return pactum
            .spec()
            .post('/auth/register')
            .withBody({
                email: 'testuser@test.test',
                password: 'password',
            })
            .expectStatus(201)
            .stores('userAt', 'access_token');
    });

    // get persistant userId to use in tests
    it('should get test user', () => {
        return pactum
            .spec()
            .get('/users/me')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .stores('userId', 'id');
    });

    // create persistant client to use in tests
    it('should create test client', () => {
        return pactum
            .spec()
            .post('/clients')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .withBody({ name: 'persistant client' })
            .expectStatus(201)
            .stores('clientId', 'id');
    });

    authTest(pactum);
    userTest(pactum);
    clientTest(pactum);
    campaignTest(pactum);
});
