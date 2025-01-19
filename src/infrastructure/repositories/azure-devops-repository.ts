import { WebApi, getPersonalAccessTokenHandler } from 'azure-devops-node-api';
import { IRepositoryRepository } from '../../domain/repositories/repository-repository.js';
import { Repository } from '../../domain/entities/repository.js';

export class AzureDevOpsRepository implements IRepositoryRepository {
  private readonly connection: WebApi;

  constructor(orgUrl: string, token: string) {
    const authHandler = getPersonalAccessTokenHandler(token);
    this.connection = new WebApi(orgUrl, authHandler);
  }

  async listAll(): Promise<Repository[]> {
    try {
      const gitApi = await this.connection.getGitApi();
      const repositories = await gitApi.getRepositories();

      return repositories.map(
        repo =>
          new Repository(
            repo.id ?? '',
            repo.name ?? '',
            repo.project?.name ?? 'Unknown',
            repo.defaultBranch ?? 'main',
            repo.webUrl ?? ''
          )
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Azure DevOps API error: ${error.message}`);
      }
      throw new Error('Azure DevOps API error: Unknown error');
    }
  }

  async findByName(name: string): Promise<Repository | null> {
    const repositories = await this.listAll();
    const repository = repositories.find(repo => repo.getName() === name);
    return repository || null;
  }

  async findByProject(projectName: string): Promise<Repository[]> {
    const repositories = await this.listAll();
    return repositories.filter(repo => repo.getProject() === projectName);
  }
}
