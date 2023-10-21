export enum QueryHistoryType {
  'HISTORY' = 'history',
  'ANOMALY' = 'anomAly'
}

export interface Query {
  type: QueryHistoryType;
  year?: string;
  projectIds: string[];
}
