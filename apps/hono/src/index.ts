import { auth } from '@acme/auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.use(
  '/api/auth/*',
  cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);
app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  console.log('c', c);
  console.log('c.req.raw', c.req.raw);

  return auth.handler(c.req.raw);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
