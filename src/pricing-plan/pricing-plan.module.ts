import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { PricingPlan } from './pricing-plan.dto';
import { DefaultPricingPlanRepository } from './pricing-plan.repository';
import { PricingPlanService } from './pricing-plan.service';
import { PricingPlanController } from './pricing-plan.controller';

@Module({
  imports: [HttpModule],
  providers: [
    PricingPlanService,
    {
      provide: TierGBFSInternalCacheGenericRepository<PricingPlan>,
      useClass: DefaultPricingPlanRepository,
    },
  ],
  exports: [PricingPlanService],
  controllers: [PricingPlanController],
})
export class PricingPlanModule {}
