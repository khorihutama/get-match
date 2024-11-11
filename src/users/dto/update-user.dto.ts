import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ example: 'New bio content', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
