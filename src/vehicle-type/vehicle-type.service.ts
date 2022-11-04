import { Injectable } from '@nestjs/common';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { VehicleType } from './vehicle-type.dto';

@Injectable()
export class VehicleTypeService {
  constructor(
    private readonly vehicleTypeRepository: TierGBFSInternalCacheGenericRepository<VehicleType>,
  ) {}

  public getVehicleTypes(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.getAll();
  }

  public getVehicleType(id: string): Promise<VehicleType> {
    return this.vehicleTypeRepository.get(id);
  }
}
