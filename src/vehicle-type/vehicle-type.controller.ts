import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseWrapperInterceptor } from 'src/core/interceptor/response-wrapper.interceptor';
import { VehicleTypeDTO, VehicleTypeMapper } from './vehicle-type.dto';
import { VehicleTypeService } from './vehicle-type.service';

@Controller('vehicle-types')
@UseInterceptors(ResponseWrapperInterceptor)
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Get()
  public async getVehicleTypes(): Promise<VehicleTypeDTO[]> {
    const vehicleTypes = await this.vehicleTypeService.getVehicleTypes();
    return vehicleTypes.map(VehicleTypeMapper.toDTO);
  }

  @Get(':id')
  public async getVehicleType(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<VehicleTypeDTO> {
    const vehicleType = await this.vehicleTypeService.getVehicleType(id);
    if (vehicleType == null) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    return VehicleTypeMapper.toDTO(vehicleType);
  }
}
