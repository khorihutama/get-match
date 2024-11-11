import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'lib/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileDto) {
    const user = await this.prisma.users.update({
      where: { id: userId },
      data,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Profile updated successfully', data: user };
  }
}
