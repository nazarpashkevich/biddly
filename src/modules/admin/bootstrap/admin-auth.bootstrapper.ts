import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import process from 'node:process';

export function adminAuthBootstrapper(prisma: PrismaClient) {
  return {
    authenticate: async (email: string, password: string) => {
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) return null;

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid || !user.email) return null;

      return {
        email: user.email,
      };
    },
    cookieName: process.env.ADMIN_COOKIE_NAME || 'adminjs',
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'adminjs',
  };
}
