# Requirements: Fastify skeleton

Roadmap: Phase 1 — Fastify and TypeScript skeleton that serves a "Hello AgentClinic" page.
Branch: `phase-1-fastify-skeleton`

## Context

- `specs/mission.md`: AgentClinic is a practical tool for staff to look after their agents. It is also a teaching and demo project, so the code must be easy to follow, built in small phases, and quick to run.
- `specs/tech-stack.md`: server-side TypeScript (strict) on Node, Fastify, server-rendered HTML, plain CSS, SQLite, Node's built-in test runner.
- The repo currently holds an Express prototype (`src/index.ts`, `src/data.ts`, `src/views.ts`, `public/styles.css`). The roadmap starts from scratch with Fastify, so this phase replaces it.

## Scope

In scope:

- Replace Express with Fastify as the web framework.
- A single route, `GET /`, that returns a server-rendered HTML page saying "Hello AgentClinic".
- A main layout component (`Layout`) composed of `Header`, `Main` and `Footer` subcomponents, and a base stylesheet (`public/styles.css`) linked from the layout.
- App factory (`src/app.ts`) separate from the server entry point (`src/server.ts`), so Phase 2 can test routes with `inject()`.
- Remove the Express prototype code and the Express dependencies.
- Tick Phase 1 off in `specs/roadmap.md`.

Out of scope (later phases):

- Tests and `npm test` (Phase 2).
- Environment-based configuration (Phase 3). The port stays a simple default for now.
- Navigation and richer styling (Phase 4). Phase 1 only has the basic layout and stylesheet.
- Health check and error handling (Phase 5), and SQLite (Phase 6).

## Decisions

- **Prototype removed.** The Express code is deleted rather than kept alongside; it remains available in git history.
- **Simple HTML page.** One server-rendered page with a title, the heading "Hello AgentClinic", a one-line tagline taken from the mission, and a viewport meta tag, rendered inside the main layout. Styled with a plain CSS file; no client JavaScript.
- **Components are functions.** `Layout`, `Header`, `Main` and `Footer` are plain TypeScript functions that return HTML strings; `@fastify/static` serves `public/`.
- **One component per file.** `Header`, `Main` and `Footer` each live in their own file (`src/components/Header.ts`, `Main.ts`, `Footer.ts`), and `Layout` in `src/components/Layout.ts` imports them. They are not defined inline in `Layout.ts` or `app.ts`.
- **App factory.** `buildApp()` in `src/app.ts` returns a configured Fastify instance without listening; `src/server.ts` calls it and starts listening.
- **Port.** Listen on port 3000 for now; configuration comes in Phase 3.
- **Escaping.** Any value interpolated into HTML must be escaped (none is needed for this static page, but keep the pattern in mind for later phases).
