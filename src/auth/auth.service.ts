import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    async register(dto: AuthDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    name: dto.name,
                },
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Duplicate user');
                }
            }
        }
    }

    async login(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException('Incorrect credentials');
        }

        const passwordMatch = await argon.verify(user.hash, dto.password);

        if (!passwordMatch) {
            throw new ForbiddenException('Incorrect credentials');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email: email,
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '60m',
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
}
