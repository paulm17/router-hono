import { betterAuth } from 'better-auth';
import { customSessionClient } from 'better-auth/client/plugins';
import { organization } from 'better-auth/plugins';
import { createAuthClient } from 'better-auth/react';
import { LibsqlDialect } from "@libsql/kysely-libsql";
 
const dialect = new LibsqlDialect({
    url: "libsql://temp-peterrushkin.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzM1Njk1NTEsImlkIjoiOGRlNmNlMmEtM2I1YS00YTdiLWE0Y2MtM2UxZGIwYTU5NzM0In0.nzectluIYydaFbhQOs8jj95C3RJQS8SJMDoHVmP2bpjn3uFfvml84DRigwIb15xnWHhrP0jSkJmSzjSIJ407CQ",
})

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:5173'],
  database: {
    dialect,
    type: "sqlite"
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization()],
});

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000', // the base url of your auth server
  plugins: [customSessionClient<typeof auth>()],
});
