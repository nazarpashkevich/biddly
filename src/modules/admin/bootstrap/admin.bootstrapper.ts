import { PrismaClient } from '@prisma/client';
import process from 'node:process';
import { initComponentLoader } from '../component.loader';
import { AdminConfig } from '../config/admin.config';
import { AuctionResource } from '../resources/auction.resource';
import { UserResource } from '../resources/user.resource';
import { adminAuthBootstrapper } from './admin-auth.bootstrapper';
import { adminPagesBootstrapper } from './admin-pages.bootstrapper';

export async function adminBootstrapper() {
  const [{ AdminModule }, AdminJSPrisma, _, { AdminJS, ComponentLoader }] =
    await Promise.all([
      import('@adminjs/nestjs'),
      import('@adminjs/prisma'),
      import('@adminjs/express'),
      import('adminjs'),
    ]);

  // init prisma client
  const prisma = new PrismaClient();

  // init custom components
  const componentLoader = new ComponentLoader();
  const components = initComponentLoader(componentLoader);

  AdminJS.registerAdapter({
    Resource: AdminJSPrisma.Resource,
    Database: AdminJSPrisma.Database,
  });

  return AdminModule.createAdminAsync({
    useFactory: () => ({
      adminJsOptions: {
        pages: adminPagesBootstrapper(components),
        componentLoader,
        resources: [
          AuctionResource(AdminJSPrisma, prisma),
          UserResource(AdminJSPrisma, prisma),
        ],
        ...AdminConfig,
      },
      auth: adminAuthBootstrapper(prisma),
      sessionOptions: {
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET ?? 'adminJs',
      },
    }),
  });
}
