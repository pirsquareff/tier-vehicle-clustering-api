export interface Indexable {
  id: string;
}

export interface Mapper<Domain, DTO> {
  toDomain?(raw: any): Domain;
  toDTO?(domain: Domain): DTO;
}
