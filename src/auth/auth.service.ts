import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    register(dto: AuthDto) {
        return { msg: 'user is signed up' };
    }

    login() {
        return { msg: 'user is signed in' };
    }
}
