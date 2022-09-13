import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
} from 'class-validator';
import { CreateFieldDto } from 'src/field/dto/createField.dto';

export class UpdateCampaignDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    slug?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    theme?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    is_published?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    is_template?: boolean;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    from?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    to?: string;

    @IsArray()
    @IsOptional()
    settings?: CreateFieldDto[];

    @IsOptional()
    content?: CreateFieldDto[];
}
