import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { CreateFieldDto } from 'src/field/dto/createField.dto';

export class CreateCampaignDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    slug?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    theme?: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isPublished: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isTemplate: boolean;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    from?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    to?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    clientId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number;

    @IsArray()
    @IsOptional()
    settings?: CreateFieldDto[];

    @IsOptional()
    content?: CreateFieldDto[];
}
