import { Indexable, Mapper } from 'src/core/interfaces';

export type PerMinPricing = {
  start: number;
  rate: number;
  interval: number;
};

export type PerMinPricingDTO = PerMinPricing;

export type PricingPlan = {
  planId: string;
  name: string;
  currency: string;
  price: number;
  isTaxable: boolean;
  description: string;
  perMinPricing: PerMinPricing[];
} & Indexable;

export type PricingPlanDTO = {
  planId: string;
  name: string;
  currency: string;
  price: number;
  isTaxable: boolean;
  description: string;
  perMinPricing: PerMinPricingDTO[];
};

export class PerMinPricingMapper {
  public static toDomain(raw: any): PerMinPricing {
    return {
      start: raw.start,
      rate: raw.rate,
      interval: raw.interval,
    };
  }

  public static toDTO(perMinPricing: PerMinPricing): PerMinPricingDTO {
    return {
      start: perMinPricing.start,
      rate: perMinPricing.rate,
      interval: perMinPricing.interval,
    };
  }
}

export class PricingPlanMapper implements Mapper<PricingPlan, PricingPlanDTO> {
  public static toDomain(raw: any): PricingPlan {
    return {
      id: raw.plan_id,
      planId: raw.plan_id,
      name: raw.name,
      currency: raw.currency,
      price: raw.price,
      isTaxable: raw.is_taxable,
      description: raw.description,
      perMinPricing: raw.per_min_pricing,
    };
  }

  public static toDTO(domain: PricingPlan): PricingPlanDTO {
    return {
      planId: domain.planId,
      name: domain.name,
      currency: domain.currency,
      price: domain.price,
      isTaxable: domain.isTaxable,
      description: domain.description,
      perMinPricing: domain.perMinPricing.map(PerMinPricingMapper.toDTO),
    };
  }
}
