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
  const { userId, projectIds } = query;

  if (projectIds?.length) {
    return getDatabaseInstance(transaction).$queryRaw(
      Prisma.sql`
       SELECT time, sum(cast(energy_consuption as numeric)) AS value
       FROM project_histories ph
       WHERE ph.user_id = ${userId}
       AND ph.project_id IN (${Prisma.join(projectIds)})
       GROUP BY time
       `
    );
  }

  return getDatabaseInstance(transaction).$queryRaw(
    Prisma.sql`
        SELECT time, sum(cast(energy_consuption as numeric)) AS value
        FROM project_histories ph
        WHERE ph."user_id" = ${userId}
        GROUP BY ph.time
        `
  );
};

export const listProjectHistoryAnomalies = (query: QueryHistory, transaction?: Prisma.TransactionClient) => {
  const { userId, projectIds } = query;

  if (projectIds?.length) {
    return getDatabaseInstance(transaction).$queryRaw(
      Prisma.sql`
      SELECT MIN(energy_consuption) AS minimum_energy_consumption,
      MAX(energy_consuption) AS maximum_energy_consumption,
      project_id
      FROM project_histories ph 
      WHERE ph.user_id = ${userId}
      AND ph.project_id in (${Prisma.join(projectIds)}) 
      group by  ph.project_id 
    `
    );
  }

  return getDatabaseInstance(transaction).$queryRaw(
    Prisma.sql`
    SELECT MIN(energy_consuption) AS minimum_energy_consumption,
    MAX(energy_consuption) AS maximum_energy_consumption,
    project_id
    FROM project_histories ph 
    WHERE ph.user_id = ${userId}
    group by ph.project_id 
  `
  );
};
