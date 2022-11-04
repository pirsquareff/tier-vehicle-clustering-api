import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { FETCH_VEHICLE_TYPES_ENDPOINT } from 'src/common/constants';
import { GBFSResponse } from 'src/common/dto/gbfs-response.dto';
import {
  VehicleType,
  VehicleTypeCollection,
  VehicleTypeCollectionGBFSResponseMapper,
} from './vehicle-type.dto';

@Injectable()
export class VehicleTypeService {
  constructor(private readonly httpService: HttpService) {}

  public async getVehicleTypes(): Promise<VehicleType[]> {
    return await firstValueFrom(
      this.httpService.get(FETCH_VEHICLE_TYPES_ENDPOINT).pipe(
        map((response) => this.parseRaw(response.data)),
        catchError((error) => {
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );
  }

  public async getVehicleTypeById(): Promise<VehicleType> {
    // TODO: return from an internal map
    return {
      vehicleTypeId: '123',
      formFactor: '123',
      propulsionType: '123',
      maxRangeMeters: 123,
      name: '123',
    };
  }

  private parseRaw(raw: any): VehicleType[] {
    const response: GBFSResponse<VehicleTypeCollection> =
      VehicleTypeCollectionGBFSResponseMapper.toDomain(raw);
    return response.data.vehicleTypes;
  }
}
