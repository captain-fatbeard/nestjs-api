import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateParticipantDto {
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;
}
