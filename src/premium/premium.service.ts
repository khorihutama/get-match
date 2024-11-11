import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/prisma.service';

@Injectable()
export class PremiumService {
  constructor(private prisma: PrismaService) {}

  async purchasePremium(userId: string, type: 'MONTHLY' | 'YEARLY') {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (type === 'MONTHLY' ? 1 : 12));

    await this.prisma.users.update({
      where: { id: userId },
      data: {
        premium: true,
        premiumSubscription: {
          create: {
            type,
            endDate,
          },
        },
      },
    });

    return { message: 'Premium subscription activated successfully' };
  }
}
