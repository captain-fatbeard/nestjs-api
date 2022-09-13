import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFieldDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    container: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    label: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    value?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    options?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;
}
