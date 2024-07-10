// src/app/api/auth/[...nextauth]/customAdapter.ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { users } from "@/db/schema";
import { eq } from 'drizzle-orm';

export function CustomAdapter(db: any) {
  return {
    ...DrizzleAdapter(db),
    createUser: async (user: any) => {
      const { emailVerified, ...userWithoutEmailVerified } = user;
      return await db.insert(users).values(userWithoutEmailVerified).returning().then((res: any) => res[0]);
    },
    getUser: async (id: string) => {
      const user = await db.query.users.findFirst({ where: (users: any, { eq }: any) => eq(users.id, id) });
      return user ? { ...user, emailVerified: null } : null;
    },
    getUserByEmail: async (email: string) => {
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
      return user.length ? { ...user[0], emailVerified: null } : null;
    },
    getUserByAccount: async ({ providerAccountId, provider }: { providerAccountId: string; provider: string }) => {
      const account = await db.query.accounts.findFirst({
        where: (accounts: any, { eq }: any) => eq(accounts.providerAccountId, providerAccountId) && eq(accounts.provider, provider),
      });
      if (!account) return null;
      const user = await db.query.users.findFirst({ where: (users: any, { eq }: any) => eq(users.id, account.userId) });
      return user ? { ...user, emailVerified: null } : null;
    },
  };
}