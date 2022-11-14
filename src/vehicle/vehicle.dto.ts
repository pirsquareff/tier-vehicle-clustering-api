import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Indexable, Mapper } from 'src/core/interfaces';
import {
  PricingPlan,
  PricingPlanDTO,
  PricingPlanMapper,
} from 'src/pricing-plan/pricing-plan.dto';
import {
  VehicleType,
  VehicleTypeDTO,
  VehicleTypeMapper,
} from 'src/vehicle-type/vehicle-type.dto';

export type Vehicle = {
  vehicleId: string;
  lat: number;
  lon: number;
  isReserved: boolean;
  isDisabled: boolean;
  vehicleTypeId: string;
  vehicleType?: VehicleType;
  currentRangeMeters: number;
  pricingPlanId: string;
  pricingPlan?: PricingPlan;
  rentalUris: any;
} & Indexable;

export type VehicleDTO = {
  vehicleId: string;
  lat: number;
  lon: number;
  isReserved: boolean;
  isDisabled: boolean;
  vehicleType: VehicleTypeDTO;
  currentRangeMeters: number;
  pricingPlan: PricingPlanDTO;
  rentalUris: any;
};

export class VehicleMapper implements Mapper<Vehicle, VehicleDTO> {
  public static toDomain(raw: any): Vehicle {
    return {
      id: raw.bike_id,
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

  public static toDTO(domain: Vehicle): VehicleDTO {
    return {
      vehicleId: domain.vehicleId,
      lat: domain.lat,
      lon: domain.lon,
      isReserved: domain.isReserved,
      isDisabled: domain.isDisabled,
      vehicleType: VehicleTypeMapper.toDTO(domain.vehicleType),
      currentRangeMeters: domain.currentRangeMeters,
      pricingPlan: PricingPlanMapper.toDTO(domain.pricingPlan),
      rentalUris: domain.rentalUris,
    };
  }
}

export class GetVehiclesDTO {
  @IsOptional()
  @IsLatitude()
  @Type(() => Number)
  @Expose({ name: 'lat' })
  lat?: number;

  @IsOptional()
  @IsLongitude()
  @Type(() => Number)
  @Expose({ name: 'lon' })
  lon?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, {
    message: 'search_radius must be a number greater than or equal 0',
  })
  @Expose({ name: 'search_radius' })
  searchRadius?: number;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value !== 'undefined'
      ? value
          .trim()
          .split(',')
          .filter((id: string) => id !== '')
      : undefined,
  )
  @Expose({ name: 'vehicle_type_ids' })
  vehicleTypeIds?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, {
    message: 'mininum_range_meters must be a number greater than or equal 0',
  })
  @Expose({ name: 'mininum_range_meters' })
  minimumRangeMeters?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @Expose({ name: 'reserved' })
  reserved?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @Expose({ name: 'disabled' })
  disabled?: boolean;
}
