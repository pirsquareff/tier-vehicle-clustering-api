import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FETCH_PRICING_PLANS_ENDPOINT } from 'src/core/constants';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { PricingPlan, PricingPlanMapper } from './pricing-plan.dto';

@Injectable()
export class DefaultPricingPlanRepository extends TierGBFSInternalCacheGenericRepository<PricingPlan> {
  constructor(private readonly httpService: HttpService) {
    super(httpService, FETCH_PRICING_PLANS_ENDPOINT);
  }

  _parseData(data: any): PricingPlan[] {
    return data.plans.map(PricingPlanMapper.toDomain);
  }
}
