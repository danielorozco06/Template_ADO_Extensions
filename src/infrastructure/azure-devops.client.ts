import { getHandlerFromToken, WebApi } from 'azure-devops-node-api';
import { Repository } from '../domain';
import logger from './logger';

export class AzureDevOpsClient {
  private readonly connection: WebApi;

  constructor(organizationUrl: string, personalAccessToken: string) {
    logger.info('Initializing Azure DevOps client');

    if (!organizationUrl || typeof organizationUrl !== 'string') {
      logger.error('Invalid organization URL provided');
      throw new Error('Invalid organization URL');
    }
    if (!personalAccessToken || typeof personalAccessToken !== 'string') {
      logger.error('Invalid personal access token provided');
      throw new Error('Invalid personal access token');
    }

    try {
      logger.debug('Creating authentication handler');
      const authHandler = getHandlerFromToken(personalAccessToken);
      logger.debug('Initializing Web API connection');
      this.connection = new WebApi(organizationUrl, authHandler);
      logger.info('Azure DevOps client initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize Azure DevOps client', { error });
      throw new Error(
        `Failed to initialize Azure DevOps client: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async listRepositories(): Promise<Repository[]> {
    logger.info('Listing repositories');
    try {
      logger.debug('Getting Git API instance');
      const gitApi = await this.connection.getGitApi();
      if (!gitApi) {
        logger.error('Failed to initialize Git API');
        throw new Error('Failed to initialize Git API');
      }

      logger.debug('Fetching repositories');
      const repos = await gitApi.getRepositories();
      if (!repos) {
        logger.warn('No repositories found');
        throw new Error('No repositories found');
      }

      logger.info(`Found ${repos.length} repositories`);
      const mappedRepos = repos.map(repo => ({
        id: repo.id ?? '',
        name: repo.name ?? '',
        url: repo.url ?? ''
      }));

      logger.debug('Successfully mapped repositories');
      return mappedRepos;
    } catch (error) {
      logger.error('Failed to list repositories', { error });
      throw new Error(
        `Failed to list repositories: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
