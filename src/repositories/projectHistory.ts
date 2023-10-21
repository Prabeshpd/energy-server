import { Prisma } from '@prisma/client';

import { getDatabaseInstance } from './helper';

interface QueryHistory {
  userId: string;
  projectIds?: string[];
}

interface QueryHistoryYear extends QueryHistory {
  year: string;
}

export const listProjectHistoryByYear = async (query: QueryHistoryYear, transaction?: Prisma.TransactionClient) => {
  const { userId, projectIds, year } = query;

  if (projectIds?.length) {
    return getDatabaseInstance(transaction).$queryRaw(
      Prisma.sql`
       SELECT time, energy_consuption, id
       FROM project_histories ph
       WHERE ph.user_id = ${userId}
       AND ph.id IN ${Prisma.join(projectIds)}
       AND DATE_PART('year', time::date) = ${year}
       `
    );
  }
  return getDatabaseInstance(transaction).$queryRaw(
    Prisma.sql`
    SELECT time, energy_consuption
    FROM project_histories ph
    WHERE ph.user_id = ${userId}
    AND DATE_PART('year', time::date) = ${year}
    `
  );
};

export const listProjectHistoryAnomalies = (query: QueryHistory, transaction?: Prisma.TransactionClient) => {
  const { userId, projectIds } = query;

  if (projectIds?.length) {
    return getDatabaseInstance(transaction).$queryRaw(
      Prisma.sql`
      SELECT MIN(energy_consuption) as minimum,
      MAX(energy_consuption) as maximum,
      project_id from project_histories ph 
      WHERE ph.user_id = ${userId}
      AND ph.project_id in ${Prisma.join(projectIds)} 
      group by  ph.project_id 
    `
    );
  }

  return getDatabaseInstance(transaction).$queryRaw(
    Prisma.sql`
    SELECT MIN(energy_consuption) as minimum,
    MAX(energy_consuption) as maximum,
    project_id from project_histories ph 
    WHERE ph.user_id = ${userId}
    group by  ph.project_id 
  `
  );
};
