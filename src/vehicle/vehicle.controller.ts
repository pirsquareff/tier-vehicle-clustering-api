import { Controller, Get, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('Vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  getVehicles(
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
    @Query('search-radius') searchRadius?: number,
    @Query('range-meters') minimumRangeMeters?: number,
    @Query('reserved') reserved?: boolean,
    @Query('disabled') disabled?: boolean,
  ) {
    return this.vehicleService.getVehiclesExpanded({
      lat,
      lon,
      searchRadius,
      minimumRangeMeters,
      reserved,
      disabled,
    });
  }
}
