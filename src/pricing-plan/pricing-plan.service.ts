import { Injectable } from '@nestjs/common';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { PricingPlan } from './pricing-plan.dto';

@Injectable()
export class PricingPlanService {
  constructor(
    private readonly pricingPlanRepository: TierGBFSInternalCacheGenericRepository<PricingPlan>,
  ) {}

  public getPricingPlans(): Promise<PricingPlan[]> {
    return this.pricingPlanRepository.getAll();
  }

  public getPricingPlan(id: string): Promise<PricingPlan> {
    return this.pricingPlanRepository.get(id);
  }
}
