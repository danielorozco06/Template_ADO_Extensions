import { Repository } from '../entities/repository.js';

export interface IRepositoryRepository {
  listAll(): Promise<Repository[]>;
  findByName(name: string): Promise<Repository | null>;
  findByProject(projectName: string): Promise<Repository[]>;
}
