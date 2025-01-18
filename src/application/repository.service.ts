import { Repository, RepositoryService } from '../domain';
import { AzureDevOpsClient } from '../infrastructure/azure-devops.client';

export class AzureRepositoryService implements RepositoryService {
  private client: AzureDevOpsClient;

  constructor(organizationUrl: string, personalAccessToken: string) {
    this.client = new AzureDevOpsClient(organizationUrl, personalAccessToken);
  }

  async listRepositories(): Promise<Repository[]> {
    return this.client.listRepositories();
  }
}
