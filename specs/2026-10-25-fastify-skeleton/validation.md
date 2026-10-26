# Validation: Fastify skeleton

The work can be merged when all of the following hold.

## Must pass

- [x] `npm run build` completes with no TypeScript errors under `strict` mode.

## Also check before merging

- [x] `npm start` serves the "Hello AgentClinic" page at http://localhost:3000 with HTTP 200.
- [x] `Header`, `Main` and `Footer` each live in their own file under `src/components/`, and `Layout.ts` imports them.
- [x] Express no longer appears in `package.json` or `src/`.
- [x] Phase 1 is ticked off in `specs/roadmap.md`.

## Not required in this phase

Automated tests (Phase 2), configuration (Phase 3) and styling (Phase 4).
