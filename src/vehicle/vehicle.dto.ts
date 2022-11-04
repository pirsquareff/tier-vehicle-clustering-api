import {
  GBFSResponse,
  GBFSResponseMapper,
} from 'src/common/dto/gbfs-response.dto';

export type VehicleCollection = {
  vehicles: Vehicle[];
};

export type Vehicle = {
  vehicleId: string;
  lat: number;
  lon: number;
  isReserved: boolean;
  isDisabled: boolean;
  vehicleTypeId: string;
  currentRangeMeters: number;
  pricingPlanId: string;
  rentalUris: any;
};

export class VehicleCollectionGBFSResponseMapper extends GBFSResponseMapper {
  public static toDomain<VehicleCollection>(
    raw: any,
  ): GBFSResponse<VehicleCollection> {
    return {
      lastUpdated: raw.last_updated,
      ttl: raw.ttl,
      version: raw.version,
      data: {
        vehicles: raw.data.bikes.map(VehicleMapper.toDomain),
      } as VehicleCollection,
    };
  }
}

export class VehicleMapper {
  public static toDomain(raw: any): Vehicle {
    return {
      vehicleId: raw.bike_id,
      lat: raw.lat,
      lon: raw.lon,
      isReserved: raw.is_reserved,
      isDisabled: raw.is_disabled,
      vehicleTypeId: raw.vehicle_type_id,
      currentRangeMeters: raw.current_range_meters,
      pricingPlanId: raw.pricing_plan_id,
      rentalUris: raw.rental_uris,
    };
  }
}
