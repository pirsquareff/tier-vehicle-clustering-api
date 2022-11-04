import {
  GBFSResponse,
  GBFSResponseMapper,
} from 'src/common/dto/gbfs-response.dto';

export type PricingPlanCollection = {
  plans: PricingPlan[];
};

export type PricingPlan = {
  planId: string;
  name: string;
  currency: string;
  price: number;
  isTaxable: boolean;
  description: string;
  perMinPricing: any[];
};

export class PricingPlanCollectionGBFSResponseMapper extends GBFSResponseMapper {
  public static toDomain<PricingPlanCollection>(
    raw: any,
  ): GBFSResponse<PricingPlanCollection> {
    return {
      lastUpdated: raw.last_updated,
      ttl: raw.ttl,
      version: raw.version,
      data: {
        plans: raw.data.plans.map(PricingPlanMapper.toDomain),
      } as PricingPlanCollection,
    };
  }
}

export class PricingPlanMapper {
  public static toDomain(raw: any): PricingPlan {
    return {
      planId: raw.plan_id,
      name: raw.name,
      currency: raw.currency,
      price: raw.price,
      isTaxable: raw.isTaxable,
      description: raw.description,
      perMinPricing: raw.perMinPricing,
    };
  }
}
