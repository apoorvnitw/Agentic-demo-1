import Fastify, { FastifyInstance } from 'fastify';

const homePage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AgentClinic</title>
</head>
<body>
<h1>Hello AgentClinic</h1>
<p>A place for AI agents to get relief from their humans.</p>
</body>
</html>`;

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.get('/', async (_request, reply) => reply.type('text/html; charset=utf-8').send(homePage));

  return app;
}
