const getRandomArbitrary = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateProjectHistoryData = () => {
  const projectIds = [
    '98d81aa6-f55e-40d1-b55a-9afb63a020fc',
    '36534f7c-1578-4766-ad4e-c3dc52d3f39f',
    'a61368ea-f13d-419f-93ec-8f80213b7bc4',
    'a7c6a254-84f6-4dbb-9c7f-1ebf2988f29a',
    '10458c9d-86a3-44ab-87f3-6c6a7fa947f9'
  ];

  const projectHistory: any = [];

  const date = new Date('2022-01-01');

  projectIds.forEach((projectId) => {
    for (let i = 0; i <= 364; i++) {
      const energyConsumption = getRandomArbitrary(20, 65);
      const time = new Date('2022-01-01');
      time.setDate(date.getDate() + i);
      projectHistory.push({
        userId: '82d59ecb-88ee-4ac4-a15d-719bbb339ce2',
        projectId: projectId,
        energyConsumption,
        time: time.toISOString()
      });
    }
  });

  return projectHistory;
};
