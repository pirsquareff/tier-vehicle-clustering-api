import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { PricingPlanModule } from './pricing-plan/pricing-plan.module';

@Module({
  imports: [VehicleModule, VehicleTypeModule, PricingPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
