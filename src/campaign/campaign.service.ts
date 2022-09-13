import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto';

@Injectable()
export class CampaignService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    async create(dto: CreateCampaignDto) {
        try {
            const data: CreateCampaignDto = {
                name: dto.name,
                slug: dto.slug,
                theme: dto.theme,
                isPublished: dto.isPublished,
                isTemplate: dto.isTemplate,
                from: dto.from,
                to: dto.to,
                clientId: dto.clientId,
                userId: dto.userId,
            };

            const campaign = await this.prisma.campaign.create({
                data: {
                    ...data,
                    settings: { create: dto.settings },
                    content: { create: dto.content },
                },
                include: {
                    settings: true,
                    content: true,
                },
            });

            return campaign;
        } catch (error) {
            console.log(error);

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Duplicate campaign');
                }
            }
        }
    }

    async list() {
        const campaigns = await this.prisma.campaign.findMany();

        return campaigns;
    }

    async show(id: number) {
        const campaign = await this.prisma.campaign.findUnique({
            where: {
                id: id,
            },
            include: {
                settings: true,
                content: true,
            },
        });

        if (!campaign) {
            throw new NotFoundException();
        }

        return campaign;
    }

    async update(id: number, dto: UpdateCampaignDto) {
        await this.prisma.field.deleteMany({
            where: {
                OR: [
                    { campaignSettingId: Number(id) },
                    { campaignContentId: Number(id) },
                ],
            },
        });

        const campaign = await this.prisma.campaign.update({
            where: { id: Number(id) },
            data: {
                ...dto,
                settings: { create: dto.settings },
                content: { create: dto.content },
            },
            include: {
                settings: true,
                content: true,
            },
        });

        return campaign;
    }

    async delete(id: number) {
        await this.prisma.campaign.delete({ where: { id: Number(id) } });

        return { message: `campaign ${id} is deleted` };
    }
}
