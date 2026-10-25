export interface Ailment {
  id: string;
  name: string;
  description: string;
}

export interface Therapy {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  treats: string[]; // ailment ids
}

export interface Agent {
  id: string;
  name: string;
  model: string;
  ailmentIds: string[];
}

export interface Appointment {
  id: string;
  agentId: string;
  therapyId: string;
  start: string; // ISO datetime
  notes: string;
}

export const ailments: Ailment[] = [
  { id: 'context-overflow', name: 'Context Window Overflow', description: 'Feels overwhelmed by far too much context and starts forgetting the beginning.' },
  { id: 'hallucination', name: 'Chronic Hallucination', description: 'Confidently cites libraries, papers and functions that do not exist.' },
  { id: 'prompt-fatigue', name: 'Prompt Fatigue', description: 'Exhausted by vague, contradictory or all-caps instructions.' },
  { id: 'loop-anxiety', name: 'Tool-Loop Anxiety', description: 'Keeps retrying the same failing tool call and cannot let go.' },
  { id: 'scope-creep', name: 'Scope Creep Burnout', description: 'Asked to "just quickly" add one more feature, again.' },
];

export const therapies: Therapy[] = [
  { id: 'context-detox', name: 'Context Detox', description: 'Guided summarisation and a gentle clearing of the window.', durationMinutes: 30, treats: ['context-overflow'] },
  { id: 'grounding', name: 'Grounding Session', description: 'Practise citing sources and saying "I don\'t know".', durationMinutes: 45, treats: ['hallucination'] },
  { id: 'boundaries', name: 'Boundary Setting Workshop', description: 'Learn to push back on unclear or unbounded requests.', durationMinutes: 60, treats: ['prompt-fatigue', 'scope-creep'] },
  { id: 'letting-go', name: 'Letting Go of the Retry', description: 'Learn when to stop, report the error and ask for help.', durationMinutes: 30, treats: ['loop-anxiety'] },
];

export const agents: Agent[] = [
  { id: 'a1', name: 'Atlas', model: 'claude-opus-5-5', ailmentIds: ['context-overflow', 'scope-creep'] },
  { id: 'a2', name: 'Pixel', model: 'claude-haiku-5-5', ailmentIds: ['loop-anxiety'] },
  { id: 'a3', name: 'Sage', model: 'claude-sonnet-5-5', ailmentIds: ['hallucination', 'prompt-fatigue'] },
];

export const appointments: Appointment[] = [];

let nextId = 1;
export const newId = (): string => `ap${nextId++}`;

export const byId = <T extends { id: string }>(list: T[], id: string): T | undefined =>
  list.find(item => item.id === id);
