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
import { ParticipantService } from './participant.service';
import { CreateParticipantDto, UpdateParticipantDto } from './dto';

@UseGuards(JwtGuard)
@Controller('/participants')
@ApiTags('participants')
@ApiBearerAuth()
export class ParticipantController {
    constructor(private participantService: ParticipantService) {}

    @Post('')
    create(@Body() dto: CreateParticipantDto) {
        return this.participantService.create(dto);
    }

    @Get('')
    list() {
        return this.participantService.list();
    }

    @Get(':id')
    show(@Param('id', ParseIntPipe) id: number) {
        return this.participantService.show(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateParticipantDto,
    ) {
        return this.participantService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.participantService.delete(id);
    }
}
