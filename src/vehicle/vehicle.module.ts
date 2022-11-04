import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { HttpModule } from '@nestjs/axios';
import { VehicleTypeModule } from 'src/vehicle-type/vehicle-type.module';
import { PricingPlanModule } from 'src/pricing-plan/pricing-plan.module';

@Module({
  imports: [HttpModule, VehicleTypeModule, PricingPlanModule],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
