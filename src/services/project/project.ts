import * as projectRepository from '@/repositories/project';

export async function listProjects(userId: string) {
  return projectRepository.listProjects(userId);
}
