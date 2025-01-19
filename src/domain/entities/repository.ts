export class Repository {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly project: string,
    private readonly defaultBranch: string,
    private readonly webUrl: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getProject(): string {
    return this.project;
  }

  public getDefaultBranch(): string {
    return this.defaultBranch;
  }

  public getWebUrl(): string {
    return this.webUrl;
  }

  public toJSON(): Record<string, string> {
    return {
      id: this.id,
      name: this.name,
      project: this.project,
      defaultBranch: this.defaultBranch,
      webUrl: this.webUrl
    };
  }
}
