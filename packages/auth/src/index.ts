import { betterAuth } from 'better-auth';
import { customSessionClient } from 'better-auth/client/plugins';
import { organization } from 'better-auth/plugins';
import { createAuthClient } from 'better-auth/react';
import Database from 'better-sqlite3';

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:5173'],
  database: new Database("./database.sqlite"),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization()],
});

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000', // the base url of your auth server
  plugins: [customSessionClient<typeof auth>()],
});
