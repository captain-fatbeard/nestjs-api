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
            console.log(dto);

            const campaign = await this.prisma.campaign.create({
                data: {
                    name: dto.name,
                    slug: dto.slug,
                    theme: dto.theme,
                    is_published: dto.is_published,
                    is_template: dto.is_template,
                    from: dto.from,
                    to: dto.to,
                    clientId: dto.clientId,
                    userId: dto.userId,
                },
            });

            console.log('campaign');
            console.log(campaign);

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
        });

        if (!campaign) {
            throw new NotFoundException();
        }

        return campaign;
    }

    async update(id: number, dto: UpdateCampaignDto) {
        const campaign = await this.prisma.campaign.update({
            where: { id: Number(id) },
            data: dto,
        });

        return campaign;
    }

    async delete(id: number) {
        await this.prisma.campaign.delete({ where: { id: Number(id) } });

        return { message: `campaign ${id} is deleted` };
    }
}
