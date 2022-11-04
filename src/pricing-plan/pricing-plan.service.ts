import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, catchError } from 'rxjs';
import { FETCH_PRICING_PLANS_ENDPOINT } from 'src/common/constants';
import { GBFSResponse } from 'src/common/dto/gbfs-response.dto';
import {
  PricingPlan,
  PricingPlanCollection,
  PricingPlanCollectionGBFSResponseMapper,
} from './pricing-plan.dto';

@Injectable()
export class PricingPlanService {
  constructor(private readonly httpService: HttpService) {}

  public async getPricingPlans() {
    // Fetch system pricing plan
    return await firstValueFrom(
      this.httpService.get(FETCH_PRICING_PLANS_ENDPOINT).pipe(
        map((response) => this.parseRaw(response.data)),
        catchError((error) => {
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );
  }

  private parseRaw(raw: any): PricingPlan[] {
    const response: GBFSResponse<PricingPlanCollection> =
      PricingPlanCollectionGBFSResponseMapper.toDomain(raw);
    return response.data.plans;
  }
}
