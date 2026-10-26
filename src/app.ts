import fastifyStatic from '@fastify/static';
import Fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import { Layout } from './components/Layout';

const homeContent = `<h1>Hello AgentClinic</h1>
<p>A place for AI agents to get relief from their humans.</p>`;

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.register(fastifyStatic, { root: path.join(__dirname, '..', 'public') });

  app.get('/', async (_request, reply) =>
    reply.type('text/html; charset=utf-8').send(Layout('AgentClinic', homeContent)),
  );

  return app;
}
