import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto, UpdateParticipantDto } from './dto';

@Injectable()
export class ParticipantService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    async create(dto: CreateParticipantDto) {
        try {
            const object = await this.prisma.participant.create({
                data: {
                    email: dto.email,
                    campaigns: {
                        connect: { id: dto.campaignId },
                    },
                },
            });

            return object;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Duplicate participant');
                }
            }
        }
    }

    async list() {
        const objects = await this.prisma.participant.findMany();

        return objects;
    }

    async show(id: number) {
        const object = await this.prisma.participant.findUnique({
            where: {
                id: id,
            },
        });

        if (!object) {
            throw new NotFoundException();
        }

        return object;
    }

    async update(id: number, dto: UpdateParticipantDto) {
        const object = await this.prisma.participant.update({
            where: { id: Number(id) },
            data: dto,
        });

        return object;
    }

    async delete(id: number) {
        await this.prisma.participant.delete({ where: { id: Number(id) } });

        return { message: `participant ${id} is deleted` };
    }
}
