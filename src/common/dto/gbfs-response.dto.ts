export type GBFSResponse<T> = {
  lastUpdated: number;
  ttl: number;
  version: string;
  data: T;
};

export abstract class GBFSResponseMapper {
  public static toDomain<T>(raw: any): GBFSResponse<T> {
    throw new Error('Method not implemented.');
  }
}
