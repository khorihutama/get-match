import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SwipesService } from './swipes.service';
import { SwipeDto } from './dto/swipe.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Swipes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('swipes')
export class SwipesController {
  constructor(private readonly swipesService: SwipesService) {}

  @Get('profiles')
  @ApiOperation({ summary: 'Get profiles to swipe' })
  @ApiResponse({ status: 200, description: 'Returns list of profiles' })
  async getProfilesToSwipe(@CurrentUser() user) {
    return await this.swipesService.getProfilesToSwipe(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Swipe on a profile' })
  @ApiResponse({ status: 201, description: 'Swipe recorded successfully' })
  async swipe(@CurrentUser() user, @Body() swipeDto: SwipeDto) {
    return await this.swipesService.swipe(
      user.id,
      swipeDto.profileId,
      swipeDto.liked,
    );
  }
}
