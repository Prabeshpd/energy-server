import { Prisma } from '@prisma/client';

import dbClient from '@/config/prismaDatabase';

export const getDatabaseInstance = (transaction?: Prisma.TransactionClient) => transaction || dbClient;
