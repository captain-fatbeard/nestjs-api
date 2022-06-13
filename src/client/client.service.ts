import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    async create(dto: CreateClientDto) {
        try {
            const client = await this.prisma.client.create({
                data: { name: dto.name },
            });

            return client;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Duplicate client');
                }
            }
        }
    }

    async list() {
        const clients = await this.prisma.client.findMany();

        return clients;
    }

    async show(id: number) {
        const client = await this.prisma.client.findUnique({
            where: {
                id: id,
            },
        });

        if (!client) {
            throw new NotFoundException();
        }

        return client;
    }

    async update(id: number, dto: UpdateClientDto) {
        const client = await this.prisma.client.update({
            where: { id: Number(id) },
            data: dto,
        });

        return client;
    }

    async delete(id: number) {
        await this.prisma.client.delete({ where: { id: Number(id) } });

        return { message: `client ${id} is deleted` };
    }
}
