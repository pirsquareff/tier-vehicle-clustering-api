import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { FETCH_VEHICLES_ENDPOINT } from 'src/common/constants';
import { GBFSResponse } from 'src/common/dto/gbfs-response.dto';
import { PricingPlanService } from 'src/pricing-plan/pricing-plan.service';
import { VehicleTypeService } from 'src/vehicle-type/vehicle-type.service';
import { VehicleFilterBuilder } from './filter/vehicle-filter';
import {
  Vehicle,
  VehicleCollection,
  VehicleCollectionGBFSResponseMapper,
} from './vehicle.dto';

type GetVehiclesParameters = {
  lat?: number;
  lon?: number;
  searchRadius?: number;
  minimumRangeMeters?: number;
  reserved?: boolean;
  disabled?: boolean;
};

@Injectable()
export class VehicleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly pricingPlanService: PricingPlanService,
  ) {}

  public async getVehiclesExpanded({
    lat,
    lon,
    searchRadius,
    minimumRangeMeters,
    reserved,
    disabled,
  }: GetVehiclesParameters) {
    const vehiclesPromise = this.getVehicles();
    const vehicleTypesPromise = this.vehicleTypeService.getVehicleTypes();
    const pricingPlansPromise = this.pricingPlanService.getPricingPlans();

    const [vehicles, vehicleTypes, pricingPlans] = await Promise.all([
      vehiclesPromise,
      vehicleTypesPromise,
      pricingPlansPromise,
    ]);

    const filters = new VehicleFilterBuilder()
      .startingLat(lat)
      .startingLon(lon)
      .searchRadius(searchRadius)
      .minimumRangeMeter(minimumRangeMeters)
      .isReserved(reserved)
      .isDisabled(disabled)
      .build();

    // TODO: expand vehicle type and pricing plan

    return {
      vehicles: vehicles.filter(filters.getPredicateFn()),
      vehicleTypes,
      pricingPlans,
    };
  }

  public async getVehicles() {
    return await firstValueFrom(
      this.httpService.get(FETCH_VEHICLES_ENDPOINT).pipe(
        map((response) => this.parseRaw(response.data)),
        catchError((error) => {
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );
  }

  private parseRaw(raw: any): Vehicle[] {
    const response: GBFSResponse<VehicleCollection> =
      VehicleCollectionGBFSResponseMapper.toDomain(raw);
    return response.data.vehicles;
  }
}
