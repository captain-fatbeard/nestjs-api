import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }
}
