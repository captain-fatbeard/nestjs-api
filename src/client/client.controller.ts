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
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto';

@UseGuards(JwtGuard)
@Controller('/clients')
@ApiTags('clients')
@ApiBearerAuth()
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Post('')
    create(@Body() dto: CreateClientDto) {
        return this.clientService.create(dto);
    }

    @Get('')
    list() {
        return this.clientService.list();
    }

    @Get(':id')
    show(@Param('id', ParseIntPipe) id: number) {
        return this.clientService.show(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateClientDto,
    ) {
        return this.clientService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.clientService.delete(id);
    }
}
