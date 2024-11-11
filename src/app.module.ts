import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SwipesModule } from './swipes/swipes.module';
import { PremiumModule } from './premium/premium.module';
import { PrismaModule } from 'lib/prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, SwipesModule, PremiumModule, PrismaModule],
})
export class AppModule {}
