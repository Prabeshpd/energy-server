import { User } from '@prisma/client';

export type UserDetail = Omit<User, 'password'>;
