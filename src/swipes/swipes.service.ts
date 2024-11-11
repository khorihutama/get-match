import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/prisma.service';

@Injectable()
export class SwipesService {
  constructor(private prisma: PrismaService) {}

  async getProfilesToSwipe(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: { swipesGiven: true },
    });

    if (this.checkResetLimit(user.lastSwipeReset)) {
      await this.prisma.users.update({
        where: { id: userId },
        data: {
          swipesLeft: user.premium ? -1 : 10,
          lastSwipeReset: new Date(),
        },
      });
    }

    const swipedToday = user.swipesGiven
      .filter((swipe) => this.isToday(swipe.createdAt))
      .map((swipe) => swipe.swipedId);

    return this.prisma.users.findMany({
      where: {
        id: {
          not: userId,
          notIn: swipedToday,
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        bio: true,
        age: true,
        gender: true,
        images: true,
        verified: true,
      },
    });
  }

  async swipe(swiperId: string, swipedId: string, liked: boolean) {
    const user = await this.prisma.users.findUnique({
      where: { id: swiperId },
    });

    if (!user.premium && user.swipesLeft === 0) {
      throw new BadRequestException('Daily swipe limit reached');
    }

    await this.prisma.swipes.create({
      data: {
        swiperId,
        swipedId,
        liked,
      },
    });

    if (!user.premium) {
      await this.prisma.users.update({
        where: { id: swiperId },
        data: {
          swipesLeft: user.swipesLeft - 1,
        },
      });
    }

    return { message: 'Swipe recorded successfully' };
  }

  private checkResetLimit(lastReset: Date): boolean {
    const resetDate = new Date(lastReset);
    return !this.isToday(resetDate);
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
