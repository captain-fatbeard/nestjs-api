import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto';

@UseGuards(JwtGuard)
@Controller('/campaigns')
@ApiTags('campaigns')
@ApiBearerAuth()
export class CampaignController {
    constructor(private campaignService: CampaignService) {}

    @Post('')
    create(@Body() dto: CreateCampaignDto) {
        return this.campaignService.create(dto);
    }

    @Get('')
    list() {
        return this.campaignService.list();
    }

    @Get(':id')
    show(@Param('id', ParseIntPipe) id: number) {
        return this.campaignService.show(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCampaignDto,
    ) {
        return this.campaignService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.campaignService.delete(id);
    }
}
