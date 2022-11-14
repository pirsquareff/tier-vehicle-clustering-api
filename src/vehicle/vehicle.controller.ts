import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseWrapperInterceptor } from 'src/core/interceptor/response-wrapper.interceptor';
import { GetVehiclesDTO, VehicleDTO, VehicleMapper } from './vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
@UseInterceptors(ResponseWrapperInterceptor)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  public async getVehicles(
    @Query() query: GetVehiclesDTO,
  ): Promise<VehicleDTO[]> {
    const vehicles = await this.vehicleService.getVehicles(query);
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
