import { toCamelCase } from '@/helpers/object';
import * as projectHistoryRepository from '@/repositories/projectHistory';
import { Query, QueryHistoryType } from '@/types/query';

export async function listProjects(userId: string, query: Query) {
  const { type, year = new Date().getFullYear().toString(), projectIds } = query;

  if (type === QueryHistoryType.HISTORY) {
    const data = await projectHistoryRepository.listProjectHistoryByYear({ year, projectIds, userId });
    return data;
  }

  const data = await projectHistoryRepository.listProjectHistoryAnomalies({ userId, projectIds });

  return toCamelCase(data);
}
