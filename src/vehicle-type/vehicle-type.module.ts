import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';

@Module({
  imports: [HttpModule],
  providers: [VehicleTypeService],
  exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
