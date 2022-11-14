import * as haversine from 'haversine';
import { Vehicle } from '../vehicle.dto';

export class VehicleFilter {
  startingLat?: number;
  startingLon?: number;
  searchRadius?: number;
  vehicleTypeIds?: Set<string>;
  minimumRangeMeters?: number;
  isReserved?: boolean;
  isDisabled?: boolean;

  public getPredicateFn() {
    return (vehicle: Vehicle) => {
      if (
        typeof this.startingLat !== 'undefined' &&
        typeof this.startingLon !== 'undefined' &&
        typeof this.searchRadius !== 'undefined'
      ) {
        const start = {
          latitude: this.startingLat,
          longitude: this.startingLon,
        };

        const end = {
          latitude: vehicle.lat,
          longitude: vehicle.lon,
        };

        if (
          !haversine(start, end, {
            threshold: this.searchRadius,
            unit: 'meter',
          })
        ) {
          return false;
        }
      }

      if (
        typeof this.vehicleTypeIds !== 'undefined' &&
        !this.vehicleTypeIds.has(vehicle.vehicleTypeId)
      ) {
        return false;
      }

      if (
        typeof this.minimumRangeMeters !== 'undefined' &&
        vehicle.currentRangeMeters < this.minimumRangeMeters
      ) {
        return false;
      }

      if (
        typeof this.isReserved !== 'undefined' &&
        vehicle.isReserved !== this.isReserved
      ) {
        return false;
      }

      if (
        typeof this.isDisabled !== 'undefined' &&
        vehicle.isDisabled !== this.isDisabled
      ) {
        return false;
      }

      return true;
    };
  }
}

export class VehicleFilterBuilder {
  private readonly _filter: VehicleFilter;

  constructor() {
    this._filter = new VehicleFilter();
  }

  public startingLat(startingLat: number): VehicleFilterBuilder {
    this._filter.startingLat = startingLat;
    return this;
  }

  public startingLon(startingLon: number): VehicleFilterBuilder {
    this._filter.startingLon = startingLon;
    return this;
  }

  public searchRadius(searchRadius: number): VehicleFilterBuilder {
    this._filter.searchRadius = searchRadius;
    return this;
  }

  public vehicleTypeIds(vehicleTypeIds: string[]): VehicleFilterBuilder {
    if (typeof vehicleTypeIds !== 'undefined') {
      this._filter.vehicleTypeIds = new Set(vehicleTypeIds);
    }
    return this;
  }

  public minimumRangeMeter(minimumRangeMeter: number): VehicleFilterBuilder {
    this._filter.minimumRangeMeters = minimumRangeMeter;
    return this;
  }

  public isReserved(isReserved: boolean): VehicleFilterBuilder {
    this._filter.isReserved = isReserved;
    return this;
  }

  public isDisabled(isDisabled: boolean): VehicleFilterBuilder {
    this._filter.isDisabled = isDisabled;
    return this;
  }

  public build(): VehicleFilter {
    return this._filter;
  }
}
