import { Injectable } from '@nestjs/common';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { PricingPlanService } from 'src/pricing-plan/pricing-plan.service';
import { VehicleTypeService } from 'src/vehicle-type/vehicle-type.service';
import { VehicleFilterBuilder } from './filter/vehicle-filter';
import { Vehicle } from './vehicle.dto';

type GetVehiclesParameters = {
  lat?: number;
  lon?: number;
  searchRadius?: number;
  vehicleTypeId?: string;
  vehicleTypeIds?: string[];
  minimumRangeMeters?: number;
  reserved?: boolean;
  disabled?: boolean;
};

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: TierGBFSInternalCacheGenericRepository<Vehicle>,
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly pricingPlanService: PricingPlanService,
  ) {}

  public async getVehicles({
    lat,
    lon,
    searchRadius,
    vehicleTypeIds,
    minimumRangeMeters,
    reserved,
    disabled,
  }: GetVehiclesParameters): Promise<Vehicle[]> {
    const vehicles = await this.vehicleRepository.getAll();

    const filters = new VehicleFilterBuilder()
      .startingLat(lat)
      .startingLon(lon)
      .searchRadius(searchRadius)
      .vehicleTypeIds(vehicleTypeIds)
      .minimumRangeMeter(minimumRangeMeters)
      .isReserved(reserved)
      .isDisabled(disabled)
      .build();

    const filteredVehicles = vehicles.filter(filters.getPredicateFn());

    return Promise.all(
      filteredVehicles.map((vehicle) => this._expandNestedReources(vehicle)),
    );
  }

  public async getVehicle(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.get(id);
    return this._expandNestedReources(vehicle);
  }

  private async _expandNestedReources(vehicle: Vehicle): Promise<Vehicle> {
    return {
      ...vehicle,
      vehicleType: await this.vehicleTypeService.getVehicleType(
        vehicle.vehicleTypeId,
      ),
      pricingPlan: await this.pricingPlanService.getPricingPlan(
        vehicle.pricingPlanId,
      ),
    };
  }
}
