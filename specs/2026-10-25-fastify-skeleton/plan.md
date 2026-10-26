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
2. `GET /` returns an HTML page with `content-type: text/html; charset=utf-8`, rendered through the main layout (group 4): an `<h1>` "Hello AgentClinic" and a one-line tagline.
3. Create `src/server.ts` that calls `buildApp()`, listens on port 3000, and exits with an error message if startup fails.

## 4. Main layout component

1. Put each subcomponent in its own file: create `src/components/Header.ts`, `src/components/Main.ts` and `src/components/Footer.ts`, each exporting one function that returns an HTML string: `Header()` holds the AgentClinic brand link, `Main(content)` wraps the page content in `<main>`, `Footer()` holds the footer text.
2. Create `src/components/Layout.ts` exporting `Layout(title, content)`, which imports the three subcomponents from their files and returns the full HTML document: doctype, `<head>` (charset, viewport meta, title, stylesheet link) and a `<body>` composed of `Header()`, `Main(content)` and `Footer()`.
3. Change `GET /` in `src/app.ts` to render its content through `Layout`.

## 5. Stylesheet

1. Create `public/styles.css` with colour tokens on `:root` (light, plus dark under `prefers-color-scheme`), and styles for `.site-header`, `.site-main` and `.site-footer`. The footer sits at the bottom of the viewport on short pages.
2. Link it from the `<head>` in `Layout.ts` with `<link rel="stylesheet" href="/styles.css">`.
3. Install `@fastify/static` and register it in `buildApp()` to serve `public/`.

## 6. Wire up scripts

1. `package.json`: set `main` to `dist/server.js`.
2. Keep `build` as `tsc`; make `start` run the build and then `node dist/server.js`.
3. Confirm `tsconfig.json` still builds `src/` into `dist/` in strict mode.

## 7. Verify

1. Run `npm run build` and fix any TypeScript errors.
2. Run `npm start` and open http://localhost:3000 to see the page with its header, main content and footer, styled by `/styles.css` (which also loads with HTTP 200).

## 8. Wrap up

1. Tick Phase 1 off in `specs/roadmap.md`.
2. Commit on the `phase-1-fastify-skeleton` branch.
