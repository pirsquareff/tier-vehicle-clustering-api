import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FETCH_VEHICLE_TYPES_ENDPOINT } from 'src/core/constants';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { VehicleType, VehicleTypeMapper } from './vehicle-type.dto';

@Injectable()
export class DefaultVehicleTypeRepository extends TierGBFSInternalCacheGenericRepository<VehicleType> {
  constructor(private readonly httpService: HttpService) {
    super(httpService, FETCH_VEHICLE_TYPES_ENDPOINT);
  }

  _parseData(data: any): VehicleType[] {
    return data.vehicle_types.map(VehicleTypeMapper.toDomain);
  }
}
