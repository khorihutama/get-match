import { Module } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { PremiumController } from './premium.controller';
import { PrismaModule } from 'lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PremiumService],
  controllers: [PremiumController],
})
export class PremiumModule {}
