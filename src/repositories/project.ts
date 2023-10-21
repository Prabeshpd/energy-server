import { Prisma } from '@prisma/client';

import { getDatabaseInstance } from './helper';

export const listProjects = async (userId: string, transaction?: Prisma.TransactionClient) =>
  getDatabaseInstance(transaction).project.findMany({ where: { userId } });
