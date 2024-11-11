import { Module } from '@nestjs/common';
import { SwipesController } from './swipes.controller';
import { SwipesService } from './swipes.service';
import { PrismaModule } from 'lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SwipesController],
  providers: [SwipesService],
})
export class SwipesModule {}
