import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export class PurchasePremiumDto {
  @ApiProperty({ enum: SubscriptionType, example: SubscriptionType.MONTHLY })
  @IsEnum(SubscriptionType)
  type: SubscriptionType;
}
