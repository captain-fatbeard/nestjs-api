import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
