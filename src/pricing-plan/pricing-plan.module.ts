import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PricingPlanService } from './pricing-plan.service';

@Module({
  imports: [HttpModule],
  providers: [PricingPlanService],
  exports: [PricingPlanService],
})
export class PricingPlanModule {}
