import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { HttpModule } from '@nestjs/axios';
import { VehicleTypeModule } from 'src/vehicle-type/vehicle-type.module';
import { PricingPlanModule } from 'src/pricing-plan/pricing-plan.module';
import { Vehicle } from './vehicle.dto';
import { TierGBFSInternalCacheGenericRepository } from 'src/core/repository/tier-gbfs-internal-cache-generic-repository';
import { DefaultVehicleRepository } from './vehicle.repository';

@Module({
  imports: [HttpModule, VehicleTypeModule, PricingPlanModule],
  providers: [
    VehicleService,
    {
      provide: TierGBFSInternalCacheGenericRepository<Vehicle>,
      useClass: DefaultVehicleRepository,
    },
  ],
  controllers: [VehicleController],
})
export class VehicleModule {}
