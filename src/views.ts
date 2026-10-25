import { Agent, Ailment, Appointment, Therapy, agents, ailments, appointments, byId, therapies } from './data';

export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

export function layout(title: string, active: string, body: string): string {
  const nav = [
    ['/', 'Dashboard'],
    ['/agents', 'Agents'],
    ['/ailments', 'Ailments'],
    ['/therapies', 'Therapies'],
    ['/appointments', 'Appointments'],
  ]
    .map(([href, label]) => `<a href="${href}"${href === active ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · AgentClinic</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header><div class="wrap bar"><a class="brand" href="/">🩺 AgentClinic</a><nav>${nav}</nav></div></header>
<main class="wrap">${body}</main>
<footer class="wrap">AgentClinic · relief for agents, from their humans</footer>
</body>
</html>`;
}

const ailmentNames = (ids: string[]): string =>
  ids.map(id => `<span class="tag">${esc(byId(ailments, id)?.name ?? id)}</span>`).join(' ') || '<span class="muted">None</span>';

export function dashboard(): string {
  const upcoming = [...appointments].sort((a, b) => a.start.localeCompare(b.start)).slice(0, 5);
  return layout('Dashboard', '/', `
<h1>Dashboard</h1>
<section class="stats">
  <div class="card stat"><b>${agents.length}</b><span>Agents in care</span></div>
  <div class="card stat"><b>${ailments.length}</b><span>Known ailments</span></div>
  <div class="card stat"><b>${therapies.length}</b><span>Therapies</span></div>
  <div class="card stat"><b>${appointments.length}</b><span>Appointments</span></div>
</section>
<div class="row">
  <section class="card"><h2>Upcoming appointments</h2>${
    upcoming.length ? appointmentTable(upcoming) : '<p class="muted">Nothing booked yet.</p>'
  }<p><a class="btn" href="/appointments/new">Book an appointment</a></p></section>
  <section class="card"><h2>Agents</h2><ul class="plain">${agents
    .map(a => `<li><a href="/agents/${a.id}">${esc(a.name)}</a> ${ailmentNames(a.ailmentIds)}</li>`)
    .join('')}</ul></section>
</div>`);
}

export function agentList(): string {
  return layout('Agents', '/agents', `
<h1>Agents</h1>
<div class="grid">${agents
    .map(
      a => `<article class="card"><h2><a href="/agents/${a.id}">${esc(a.name)}</a></h2>
<p class="muted">${esc(a.model)}</p><p>${ailmentNames(a.ailmentIds)}</p></article>`,
    )
    .join('')}</div>`);
}

export function agentDetail(agent: Agent): string {
  const suggested = therapies.filter(t => t.treats.some(id => agent.ailmentIds.includes(id)));
  const mine = appointments.filter(a => a.agentId === agent.id);
  return layout(agent.name, '/agents', `
<h1>${esc(agent.name)}</h1>
<p class="muted">${esc(agent.model)}</p>
<section class="card"><h2>Ailments</h2><p>${ailmentNames(agent.ailmentIds)}</p></section>
<section class="card"><h2>Recommended therapies</h2>${
    suggested.length
      ? `<ul class="plain">${suggested
          .map(t => `<li><b>${esc(t.name)}</b> (${t.durationMinutes} min) <a href="/appointments/new?agent=${agent.id}&therapy=${t.id}">Book</a></li>`)
          .join('')}</ul>`
      : '<p class="muted">None.</p>'
  }</section>
<section class="card"><h2>Appointments</h2>${mine.length ? appointmentTable(mine) : '<p class="muted">None booked.</p>'}</section>`);
}

export function ailmentList(): string {
  return layout('Ailments', '/ailments', `
<h1>Ailments</h1>
<div class="grid">${ailments
    .map((al: Ailment) => {
      const cures = therapies.filter(t => t.treats.includes(al.id));
      return `<article class="card"><h2>${esc(al.name)}</h2><p>${esc(al.description)}</p>
<p class="muted">Treated by: ${cures.map(t => esc(t.name)).join(', ') || 'no therapy yet'}</p></article>`;
    })
    .join('')}</div>`);
}

export function therapyList(): string {
  return layout('Therapies', '/therapies', `
<h1>Therapies</h1>
<div class="grid">${therapies
    .map(
      (t: Therapy) => `<article class="card"><h2>${esc(t.name)}</h2><p>${esc(t.description)}</p>
<p class="muted">${t.durationMinutes} minutes</p><p>${ailmentNames(t.treats)}</p>
<a class="btn" href="/appointments/new?therapy=${t.id}">Book</a></article>`,
    )
    .join('')}</div>`);
}

function appointmentTable(list: Appointment[]): string {
  return `<table><thead><tr><th>When</th><th>Agent</th><th>Therapy</th></tr></thead><tbody>${list
    .map(
      a => `<tr><td>${fmtDate(a.start)}</td><td>${esc(byId(agents, a.agentId)?.name ?? '?')}</td><td>${esc(
        byId(therapies, a.therapyId)?.name ?? '?',
      )}</td></tr>`,
    )
    .join('')}</tbody></table>`;
}

export function appointmentList(): string {
  const sorted = [...appointments].sort((a, b) => a.start.localeCompare(b.start));
  return layout('Appointments', '/appointments', `
<h1>Appointments</h1>
${sorted.length ? appointmentTable(sorted) : '<p class="muted">Nothing booked yet.</p>'}
<p><a class="btn" href="/appointments/new">Book an appointment</a></p>`);
}

export function bookingForm(sel: { agent?: string; therapy?: string }, error = '', start = '', notes = ''): string {
  const opt = <T extends { id: string; name: string }>(list: T[], chosen?: string) =>
    list.map(i => `<option value="${i.id}"${i.id === chosen ? ' selected' : ''}>${esc(i.name)}</option>`).join('');
  return layout('Book an appointment', '/appointments', `
<h1>Book an appointment</h1>
${error ? `<p class="error" role="alert">${esc(error)}</p>` : ''}
<form method="post" action="/appointments" class="card form">
  <label>Agent<select name="agentId" required>${opt(agents, sel.agent)}</select></label>
  <label>Therapy<select name="therapyId" required>${opt(therapies, sel.therapy)}</select></label>
  <label>Date and time<input type="datetime-local" name="start" value="${esc(start)}" required></label>
  <label>Notes<textarea name="notes" rows="3">${esc(notes)}</textarea></label>
  <button class="btn" type="submit">Book</button>
</form>`);
}

export const notFound = (): string => layout('Not found', '', '<h1>Not found</h1><p><a href="/">Back to the dashboard</a></p>');
