import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;
}
