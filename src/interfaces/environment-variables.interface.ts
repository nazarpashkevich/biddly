export interface EnvironmentVariables {
  // # Server
  API_PORT: number;
  API_HOST: string;

  // # Database
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;

  // # Prisma
  DATABASE_URL: string;

  FRONTEND_URL: string;

  NODE_ENV: string;
}
