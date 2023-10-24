import dbClient from '@/config/prismaDatabase';
import { createUser } from '@/services/user/user';

import { projects } from './fixtures/projects';

import { generateProjectHistoryData } from './fixtures/projectHistory';

export const seedProjectData = async () => {
  try {
    const user = {
      id: '82d59ecb-88ee-4ac4-a15d-719bbb339ce2',
      name: 'default user',
      email: 'defaultUser@gmail.com',
      password: 'Password@123'
    };

    const projectHistory = generateProjectHistoryData();

    await createUser(user);
    console.log('-----------------------Seeded User-------------------------');
    await dbClient.project.createMany({ data: projects });
    console.log('------------------------Seeded Project---------------------');
    await dbClient.projectHistory.createMany({ data: projectHistory });
    console.log('------------------------Seeded Project History-------------');
  } catch (err) {
    console.log(err);
  }
};

seedProjectData();
