# Tech Stack

| Area | Choice | Why |
| --- | --- | --- |
| Language | TypeScript (strict), server-side | Required by engineering; compiled with `tsc` to `dist/` |
| Runtime | Node.js (current LTS) | Popular, reliable |
| Framework | **Fastify** | Mature and popular; types ship with it; built-in schema validation (TypeBox for inferred types); plugins for static files, forms, cookies and sessions; `inject()` tests routes without a network |
| Rendering | Server-rendered HTML | Template functions in TypeScript; no client framework; little or no client JavaScript |
| Styling | Plain CSS | Responsive; light and dark via `prefers-color-scheme` |
| Database | SQLite (the only database) | Zero-setup single file; all data access sits behind one module |
| Testing | Node's built-in test runner | Route tests via Fastify `inject()` |

## Constraints

- Works well in current Chrome, Edge, Firefox and Safari.
- Escape all user-supplied output; validate all input on the server.
- Keep dependencies few and well maintained.
- Configure through environment variables (`PORT`, database path).

## Layout

- `src/` application code (routes, data access, views)
- `public/` static assets
- `specs/` this constitution
