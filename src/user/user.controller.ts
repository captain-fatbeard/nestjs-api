import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDecorator } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
    @Get('me')
    me(@UserDecorator() user: User) {
        return user;
    }
}
