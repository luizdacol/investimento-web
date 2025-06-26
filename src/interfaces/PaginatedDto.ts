export interface PaginatedDto<T> {
  content: T[];
  metadata: Metadata;
}

export interface Metadata {
  skip: number;
  take: number;
  totalRecords: number;
}
