# AGENTS.md

## Project Overview

- Frontend for the **Universal Understanding Utility (UUU)** — a platform for analyzing COBOL systems, backed by a Flask API.
- Core function: given a COBOL code snippet, the API returns a structured analysis:
  - `risk_level` — risk assessment of the code
  - `summary` / `explanation` — plain-language breakdown
  - `dependencies`, `data_flows`, complexity indicators
  - A code map (graph of program structure, renderable as Mermaid)
- Stack: React 19 + TypeScript, Vite, TanStack Router, Tailwind CSS v4.
- Code style/linting: Biome (no ESLint/Prettier). 2-space indent.

## Environment Setup & Run

- Install all deps: `bun install`
- Install a single package: `bun add <package>`
- Local dev server: `bun dev`
- Production build: `bun run build`
- Preview production build: `bun run preview`
- Check lint/format (no writes): `bun run lint`
- Fix lint/format issues: `bun run lint:fix`

## Project Structure

- `src/routes/` — TanStack Router routes (file-based routing).
- `src/components/` — components shared across multiple routes.
- `src/components/<route-name>/` — components specific to a single route, in a directory named after that route.
- `src/lib/` — helpers, utils, and other non-component functions.
- Import alias: `@/*` resolves to `./src/*`.

## Coding Conventions

- Prefer functional programming; avoid mutating globals.
- File names must use **kebab-case**.
- Run `bun run lint` before considering a change complete. Biome is the source of truth for style.

## Component structure, UI & accessibility

- Don't write unnecessary markup. Write as little markup/styling as needed for the required UI.
- Always write responsive, semantic markup with proper ARIA labels.

## Documentation & Dependency Versions

- Prefer checking `node_modules/<package>` for docs/source if they're bundled there.
- Otherwise, look up the package's docs. matching the version pinned in `package.json`, not the latest.
- For Tailwind v4, also refer to `tailwind.md`.

## Project/Library Specific Rules

- If a convention isn't covered by this file, or `tailwind.md`, ask before assuming rather than guessing.
