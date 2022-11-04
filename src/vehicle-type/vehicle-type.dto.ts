import { Indexable, Mapper } from 'src/core/interfaces';

export type VehicleType = {
  vehicleTypeId: string;
  formFactor: string;
  propulsionType: string;
  maxRangeMeters: number;
  name: string;
} & Indexable;

export type VehicleTypeDTO = {
  vehicleTypeId: string;
  formFactor: string;
  propulsionType: string;
  maxRangeMeters: number;
  name: string;
};

export class VehicleTypeMapper implements Mapper<VehicleType, VehicleTypeDTO> {
  public static toDomain(raw: any): VehicleType {
    return {
      id: raw.vehicle_type_id,
      vehicleTypeId: raw.vehicle_type_id,
      formFactor: raw.form_factor,
      propulsionType: raw.propulsion_type,
      maxRangeMeters: raw.max_range_meters,
      name: raw.name,
    };
  }

  public static toDTO(domain: VehicleType): VehicleTypeDTO {
    return {
      vehicleTypeId: domain.vehicleTypeId,
      formFactor: domain.formFactor,
      propulsionType: domain.propulsionType,
      maxRangeMeters: domain.maxRangeMeters,
      name: domain.name,
    };
  }
}
