# Azure Repositories Lister

A TypeScript project using Domain Driven Design (DDD) to list Azure DevOps repositories.

## Project Structure

The project follows DDD principles with the following structure:

```
src/
├── domain/           # Domain entities and interfaces
├── application/      # Use cases and application logic
└── infrastructure/   # External implementations (Azure DevOps API)
```

## Prerequisites

- Node.js (v16 or higher)
- An Azure DevOps account
- A Personal Access Token (PAT) with read access to repositories

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Configure your Azure DevOps credentials in `.env`:
   - `AZURE_DEVOPS_ORG`: Your Azure DevOps organization name
   - `AZURE_DEVOPS_TOKEN`: Your Personal Access Token

## Getting an Azure DevOps PAT

1. Go to https://dev.azure.com/{your-organization}/_usersSettings/tokens
2. Click "New Token"
3. Give it a name and select the following scopes:
   - Code (Read)
4. Copy the token value (you won't be able to see it again)
5. Paste it in your `.env` file

## Usage

Build and run the project:

```bash
npm run build
npm start
```

The application will list all repositories in your Azure DevOps organization, showing:
- Repository name
- Project name
- Default branch
- Web URL

## Development

- `npm run build` - Build the project
- `npm run dev` - Run in development mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
