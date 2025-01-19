import { Repository } from '../../domain/entities/repository.js';
import { IRepositoryRepository } from '../../domain/repositories/repository-repository.js';

export class ListRepositoriesUseCase {
  constructor(private readonly repositoryRepository: IRepositoryRepository) {}

  async execute(): Promise<Repository[]> {
    try {
      return await this.repositoryRepository.listAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to list repositories: ${error.message}`);
      }
      throw new Error('Failed to list repositories: Unknown error');
    }
  }
}
