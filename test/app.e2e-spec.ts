import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';

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

    describe('auth', () => {
        const dto: AuthDto = {
            email: 'test@test.test',
            password: 'password',
        };
        describe('register', () => {
            it('should not register with invalid email', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody({
                        password: dto.password,
                    })
                    .expectStatus(400);
            });
            it('should not register with empty password', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody({
                        email: dto.email,
                    })
                    .expectStatus(400);
            });
            it('should not register with empty body', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody({})
                    .expectStatus(400);
            });
            it('should register user with correct credentials', () => {
                return pactum
                    .spec()
                    .post('/auth/register')
                    .withBody(dto)
                    .expectStatus(201);
            });
        });
        describe('login', () => {
            it('should not login with invalid email', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody({
                        password: dto.password,
                    })
                    .expectStatus(400);
            });
            it('should not login with empty password', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody({
                        email: dto.email,
                    })
                    .expectStatus(400);
            });
            it('should not login with empty body', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody({})
                    .expectStatus(400);
            });
            it('should login user with correct credentials', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'access_token');
            });
        });
    });

    describe('users', () => {
        describe('show me', () => {
            it('should get user with correct access token', () => {
                return pactum
                    .spec()
                    .get('/users/me')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(200);
            });
            it('should not get user with incorrect access token', () => {
                return pactum
                    .spec()
                    .get('/users/me')
                    .withHeaders({
                        Authorization: 'Bearer notoken',
                    })
                    .expectStatus(401);
            });
        });
    });
});
