import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FETCH_VEHICLES_ENDPOINT } from 'src/core/constants';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { Vehicle, VehicleMapper } from './vehicle.dto';

@Injectable()
export class DefaultVehicleRepository extends TierGBFSInternalCacheGenericRepository<Vehicle> {
  constructor(private readonly httpService: HttpService) {
    super(httpService, FETCH_VEHICLES_ENDPOINT);
  }

  _parseData(data: any): Vehicle[] {
    return data.bikes.map(VehicleMapper.toDomain);
  }
}
