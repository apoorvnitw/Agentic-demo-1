# Plan: Fastify skeleton

See `requirements.md` for scope and decisions, and `validation.md` for the merge criteria.

## 1. Clear out the Express prototype

1. Delete `src/index.ts`, `src/data.ts`, `src/views.ts` and `public/styles.css` (and the empty `public/` folder).
2. Uninstall `express` and `@types/express`.

## 2. Add Fastify

1. Install `fastify`.
2. Keep `@types/node` and `typescript` as dev dependencies.

## 3. Build the app

1. Create `src/app.ts` exporting `buildApp()`, which creates a Fastify instance (logging on) and registers `GET /`.
2. `GET /` returns a minimal HTML page with `content-type: text/html; charset=utf-8`: viewport meta tag, `<title>AgentClinic</title>`, an `<h1>` "Hello AgentClinic", and a one-line tagline.
3. Create `src/server.ts` that calls `buildApp()`, listens on port 3000, and exits with an error message if startup fails.

## 4. Wire up scripts

1. `package.json`: set `main` to `dist/server.js`.
2. Keep `build` as `tsc`; make `start` run the build and then `node dist/server.js`.
3. Confirm `tsconfig.json` still builds `src/` into `dist/` in strict mode.

## 5. Verify

1. Run `npm run build` and fix any TypeScript errors.
2. Run `npm start` and open http://localhost:3000 to see the page.

## 6. Wrap up

1. Tick Phase 1 off in `specs/roadmap.md`.
2. Commit on the `phase-1-fastify-skeleton` branch.
