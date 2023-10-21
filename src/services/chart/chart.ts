import fs from 'fs';

export const getMapJson = async () => {
  const mapJson = await fs.readFileSync('./static/bangkok-district.topojson', { encoding: 'utf-8' });

  return JSON.parse(mapJson);
};
