import {
  GBFSResponse,
  GBFSResponseMapper,
} from 'src/common/dto/gbfs-response.dto';

export type VehicleTypeCollection = {
  vehicleTypes: VehicleType[];
};

export type VehicleType = {
  vehicleTypeId: string;
  formFactor: string;
  propulsionType: string;
  maxRangeMeters: number;
  name: string;
};

export class VehicleTypeCollectionMapper {
  public static toDomain(raw: any): VehicleTypeCollection {
    return {
      vehicleTypes: raw.vehicle_types,
    };
  }
}

export class VehicleTypeCollectionGBFSResponseMapper extends GBFSResponseMapper {
  public static toDomain<VehicleTypeCollection>(
    raw: any,
  ): GBFSResponse<VehicleTypeCollection> {
    return {
      lastUpdated: raw.last_updated,
      ttl: raw.ttl,
      version: raw.version,
      data: {
        vehicleTypes: raw.data.vehicle_types.map(VehicleTypeMapper.toDomain),
      } as VehicleTypeCollection,
    };
  }
}

export class VehicleTypeMapper {
  public static toDomain(raw: any): VehicleType {
    return {
      vehicleTypeId: raw.vehicle_type_id,
      formFactor: raw.form_factor,
      propulsionType: raw.propulsion_type,
      maxRangeMeters: raw.max_range_meters,
      name: raw.name,
    };
  }
}
