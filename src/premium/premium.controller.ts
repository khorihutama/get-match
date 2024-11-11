import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { PurchasePremiumDto } from './dto/premium.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Premium')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @Post('purchase')
  @ApiOperation({ summary: 'Purchase premium subscription' })
  @ApiResponse({
    status: 201,
    description: 'Premium subscription activated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async purchasePremium(
    @Req() req,
    @Body() purchasePremiumDto: PurchasePremiumDto,
  ) {
    return await this.premiumService.purchasePremium(
      req.user.id,
      purchasePremiumDto.type,
    );
  }
}
