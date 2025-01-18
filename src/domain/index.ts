// Domain layer - Core business logic
export interface Repository {
  id: string;
  name: string;
  url: string;
}

export interface RepositoryService {
  listRepositories(): Promise<Repository[]>;
}
