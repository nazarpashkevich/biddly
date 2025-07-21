import { PrismaClient } from '@prisma/client';
import process from 'node:process';
import { initComponentLoader } from '../component.loader';
import { AdminConfig } from '../config/admin.config';
import { auctionResource } from '../resources/auction.resource';
import { lotResource } from '../resources/lot.resource';
import { userResource } from '../resources/user.resource';
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

  // init resources
  const resources = await Promise.all([
    auctionResource(prisma, components),
    lotResource(prisma, components, componentLoader),
    userResource(prisma),
  ]);

  return AdminModule.createAdminAsync({
    useFactory: () => ({
      adminJsOptions: {
        pages: adminPagesBootstrapper(components),
        componentLoader,
        resources,
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
