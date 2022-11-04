import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { VehicleType } from './vehicle-type.dto';
import { DefaultVehicleTypeRepository } from './vehicle-type.repository';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';

@Module({
  imports: [HttpModule],
  providers: [
    VehicleTypeService,
    {
      provide: TierGBFSInternalCacheGenericRepository<VehicleType>,
      useClass: DefaultVehicleTypeRepository,
    },
  ],
  exports: [VehicleTypeService],
  controllers: [VehicleTypeController],
})
export class VehicleTypeModule {}
