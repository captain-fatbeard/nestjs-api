import { AuthDto } from '../../src/auth/dto';

export function authTest(pactum) {
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
                    .expectStatus(400)
                    .stores('userId', 'id');
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
            it('should login with correct credentials', () => {
                return pactum
                    .spec()
                    .post('/auth/login')
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'access_token');
            });
        });
    });
}
