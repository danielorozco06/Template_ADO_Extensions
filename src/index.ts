import dotenv from 'dotenv';
import { AzureDevOpsRepository } from './infrastructure/repositories/azure-devops-repository.js';
import { ListRepositoriesUseCase } from './application/use-cases/list-repositories.use-case.js';

// Load environment variables
dotenv.config();

const { AZURE_DEVOPS_ORG, AZURE_DEVOPS_TOKEN } = process.env;

if (!AZURE_DEVOPS_ORG || !AZURE_DEVOPS_TOKEN) {
  console.error('Error: AZURE_DEVOPS_ORG and AZURE_DEVOPS_TOKEN environment variables are required');
  process.exit(1);
}

async function main(): Promise<void> {
  try {
    // Create repository implementation
    // We can safely assert these are strings since we checked above
    const orgUrl = `https://dev.azure.com/${AZURE_DEVOPS_ORG as string}`;
    const repository = new AzureDevOpsRepository(orgUrl, AZURE_DEVOPS_TOKEN as string);

    // Create and execute use case
    const listRepositories = new ListRepositoriesUseCase(repository);
    const repositories = await listRepositories.execute();

    // Output results
    console.log('\nAzure DevOps Repositories:\n');
    repositories.forEach(repo => {
      console.log(`Repository: ${repo.getName()}`);
      console.log(`Project: ${repo.getProject()}`);
      console.log(`Default Branch: ${repo.getDefaultBranch()}`);
      console.log(`URL: ${repo.getWebUrl()}`);
      console.log('-------------------');
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

// Execute the main function
main();
