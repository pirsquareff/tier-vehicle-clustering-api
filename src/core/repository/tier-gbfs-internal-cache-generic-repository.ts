import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { catchError, firstValueFrom, map, tap } from 'rxjs';
import { Indexable } from '../interfaces';
import { IGenericRepository } from './generic-repository';

class TierGBFSSnapshot {
  lastUpdated: number;
  ttl: number;

  constructor() {
    this.lastUpdated = Math.floor(Date.now() / 1000);
    this.ttl = -1;
  }

  outdated() {
    const now = Date.now() / 1000;
    return now - this.lastUpdated > this.ttl;
  }
}

class GBFSResponseMapper {
  public static toDomain(raw: any) {
    return {
      lastUpdated: raw.last_updated,
      ttl: raw.ttl,
      data: raw.data,
    };
  }
}

export abstract class TierGBFSInternalCacheGenericRepository<
  T extends Indexable,
> implements IGenericRepository<T>
{
  private _collection: T[];
  private _collectionMap: Map<string, T>;
  private _snapshot: TierGBFSSnapshot;
  private _endpoint: string;
  private _httpService: HttpService;

  constructor(httpService: HttpService, endpoint: string) {
    this._collection = [];
    this._collectionMap = new Map();
    this._snapshot = new TierGBFSSnapshot();
    this._endpoint = endpoint;
    this._httpService = httpService;
  }

  public async getAll(): Promise<T[]> {
    if (this._snapshot.outdated()) {
      await this._syncFromSource();
    }
    return this._collection;
  }

  public async get(id: string): Promise<T> {
    if (this._snapshot.outdated()) {
      await this._syncFromSource();
    }
    if (!this._collectionMap.has(id)) {
      return null;
    }
    return this._collectionMap.get(id);
  }

  // TODO: Make periodic syncing task configurable
  @Cron('* * * * * *')
  private async _syncFromSource() {
    if (this._snapshot.outdated()) {
      console.log('[OUTDATED] syncFromSource...', this._endpoint);
      this._collection = await firstValueFrom(
        this._httpService.get(this._endpoint).pipe(
          map((response) => GBFSResponseMapper.toDomain(response.data)),
          tap(({ lastUpdated, ttl }) => {
            this._snapshot.lastUpdated = lastUpdated;
            this._snapshot.ttl = ttl;
          }),
          map((response) => this._parseData(response.data)),
          catchError((error) => {
            console.log('_syncFromSource failed', error);
            throw '_syncFromSource failed';
          }),
        ),
      );

      this._updateInternalMap(this._collection);
    }
  }

  private _updateInternalMap(collection: T[]) {
    this._collectionMap = new Map(collection.map((item) => [item.id, item]));
  }

  abstract _parseData(data: any): T[];
}
