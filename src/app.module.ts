import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { ClientModule } from './client/client.module';
import { CampaignModule } from './campaign/campaign.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        AuthModule,
        ClientModule,
        CampaignModule,
        ParticipantModule,
    ],
    controllers: [UserController],
})
export class AppModule {}
