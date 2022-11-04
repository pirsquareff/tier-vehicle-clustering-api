import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { VehicleDTO, VehicleMapper } from './vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  public async getVehicles(
    @Query('lat') lat?: number,
    @Query('lon') lon?: number,
    @Query('search-radius') searchRadius?: number,
    @Query('range-meters') minimumRangeMeters?: number,
    @Query('reserved') reserved?: boolean,
    @Query('disabled') disabled?: boolean,
  ): Promise<VehicleDTO[]> {
    const vehicles = await this.vehicleService.getVehicles({
      lat,
      lon,
      searchRadius,
      minimumRangeMeters,
      reserved,
      disabled,
    });

    return vehicles.map(VehicleMapper.toDTO);
  }

  @Get(':id')
  public async getVehicle(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<VehicleDTO> {
    const vehicle = await this.vehicleService.getVehicle(id);
    if (vehicle == null) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    return VehicleMapper.toDTO(vehicle);
  }
}
