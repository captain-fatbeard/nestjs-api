import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateParticipantDto {
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email?: string;
}
