import { AzureRepositoryService } from './application/repository.service';
import { config } from 'dotenv';

config();

async function main() {
  const organizationUrl = process.env.AZURE_ORGANIZATION_URL;
  const personalAccessToken = process.env.AZURE_PERSONAL_ACCESS_TOKEN;

  if (!organizationUrl || !personalAccessToken) {
    console.error(
      'Please configure AZURE_ORGANIZATION_URL and AZURE_PERSONAL_ACCESS_TOKEN in .env file'
    );
    process.exit(1);
  }

  const service = new AzureRepositoryService(organizationUrl, personalAccessToken);

  try {
    const repos = await service.listRepositories();
    console.log('Azure Repositories:');
    repos.forEach(repo => {
      console.log(`- ${repo.name} (${repo.url})`);
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    process.exit(1);
  }
}

main();
