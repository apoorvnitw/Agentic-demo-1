# Roadmap

Foundations first. Every phase is small, ships on its own, and leaves the app working.

## Foundations

- [ ] Phase 1: Fastify and TypeScript skeleton that serves a "Hello AgentClinic" page.
- [ ] Phase 2: `npm test` with one smoke test using `inject()`.
- [ ] Phase 3: Environment-based configuration (port).
- [ ] Phase 4: Shared page layout with navigation and base stylesheet (light and dark).
- [ ] Phase 5: Health check route (`/healthz`) and a handler for unexpected errors.
- [ ] Phase 6: SQLite connection and a schema migration step.

## Agents

- [ ] Phase 7: Agents table and a seeded list of agents.
- [ ] Phase 8: Agents list page.
- [ ] Phase 9: Agent detail page.
- [ ] Phase 10: Create an agent.
- [ ] Phase 11: Edit an agent.

## Ailments

- [ ] Phase 12: Ailments table, seed data and list page.
- [ ] Phase 13: Record an ailment on an agent.
- [ ] Phase 14: Remove an ailment from an agent.
- [ ] Phase 15: Create and edit ailments.

## Therapies

- [ ] Phase 16: Therapies table, seed data and list page.
- [ ] Phase 17: Link therapies to the ailments they treat.
- [ ] Phase 18: Show recommended therapies on the agent page.

## Appointments

- [ ] Phase 19: Appointments table and list page.
- [ ] Phase 20: Booking form with validation (future time only).
- [ ] Phase 21: Reject double-booking an agent.
- [ ] Phase 22: Cancel an appointment.
- [ ] Phase 23: Reschedule an appointment.
- [ ] Phase 24: Appointment status (scheduled, completed, cancelled) and session notes.

## Dashboard

- [ ] Phase 25: Dashboard with counts and upcoming appointments.
- [ ] Phase 26: Search and filters.

## Access

- [ ] Phase 27: Staff login with a session cookie.
- [ ] Phase 28: Protect staff-only pages and routes.
- [ ] Phase 29: Agent accounts and an agent-facing view of their own profile and appointments.

## Polish

- [ ] Phase 30: Visual design pass and cross-browser check.
- [ ] Phase 31: Accessibility audit and fixes.
- [ ] Phase 32: Deployment setup and documentation.
