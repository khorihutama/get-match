import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { JwtPayload } from './interfaces/jwt-auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: {
        email: signupDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        ...signupDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        premium: true,
        verified: true,
      },
    });

    return this.generateAuthResponse(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        premium: true,
        verified: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return this.generateAuthResponse(userWithoutPassword);
  }

  private generateAuthResponse(user: Partial<any>) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      premium: user.premium,
      verified: user.verified,
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        premium: user.premium,
        verified: user.verified,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.prisma.users.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          premium: true,
          verified: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
