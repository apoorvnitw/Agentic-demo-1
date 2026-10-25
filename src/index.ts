import express from 'express';
import path from 'path';
import { agents, appointments, byId, newId, therapies } from './data';
import * as v from './views';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

const str = (x: unknown): string => (typeof x === 'string' ? x : '');

app.get('/', (_req, res) => res.send(v.dashboard()));
app.get('/agents', (_req, res) => res.send(v.agentList()));
app.get('/agents/:id', (req, res) => {
  const agent = byId(agents, req.params.id);
  res.status(agent ? 200 : 404).send(agent ? v.agentDetail(agent) : v.notFound());
});
app.get('/ailments', (_req, res) => res.send(v.ailmentList()));
app.get('/therapies', (_req, res) => res.send(v.therapyList()));
app.get('/appointments', (_req, res) => res.send(v.appointmentList()));
app.get('/appointments/new', (req, res) =>
  res.send(v.bookingForm({ agent: str(req.query.agent), therapy: str(req.query.therapy) })),
);

app.post('/appointments', (req, res) => {
  const agentId = str(req.body.agentId);
  const therapyId = str(req.body.therapyId);
  const start = str(req.body.start);
  const notes = str(req.body.notes).slice(0, 500);
  const fail = (msg: string) =>
    res.status(400).send(v.bookingForm({ agent: agentId, therapy: therapyId }, msg, start, notes));

  if (!byId(agents, agentId) || !byId(therapies, therapyId)) return fail('Choose a valid agent and therapy.');
  const when = new Date(start);
  if (isNaN(when.getTime())) return fail('Choose a valid date and time.');
  if (when.getTime() < Date.now()) return fail('Appointments must be in the future.');
  const iso = when.toISOString();
  if (appointments.some(a => a.agentId === agentId && a.start === iso)) {
    return fail('That agent already has an appointment at this time.');
  }

  appointments.push({ id: newId(), agentId, therapyId, start: iso, notes });
  res.redirect('/appointments');
});

app.use((_req, res) => res.status(404).send(v.notFound()));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`AgentClinic running at http://localhost:${port}`));
