import * as projectHistoryRepository from '@/repositories/projectHistory';
import { Query, QueryHistoryType } from '@/types/query';

export async function listProjects(userId: string, query: Query) {
  const { type, year = new Date().getFullYear().toString(), projectIds } = query;

  if (type === QueryHistoryType.HISTORY) {
    return projectHistoryRepository.listProjectHistoryByYear({ year, projectIds, userId });
  }

  return projectHistoryRepository.listProjectHistoryAnomalies({ userId, projectIds });
}
