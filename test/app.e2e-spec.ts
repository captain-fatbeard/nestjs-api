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

    authTest(pactum); // auth must run first to get access token for security headers
    userTest(pactum);
    clientTest(pactum);
    campaignTest(pactum); // user and client must run before to get id's
});
