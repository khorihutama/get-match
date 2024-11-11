import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class SwipeDto {
  @ApiProperty({ example: '1d5c2599-261d-4094-9ae5-347e91362309' })
  @IsInt()
  profileId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  liked: boolean;
}
