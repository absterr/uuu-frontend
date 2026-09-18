# Universal Understanding Utility

Frontend for the Universal Understanding Utility (UUU), a web application for analysing legacy COBOL systems and making their structure, risks, and behaviour easier to understand.

## Features

- COBOL code analysis
- Risk assessment and risk scoring
- Plain-language summaries and explanations
- Python equivalent generation
- Interactive code maps
- Analysis history
- Analysis-specific questions and conversations
- Comments on analyses
- Bulk code analysis
- Team management
- API key management
- Compliance reporting
- Subscription plans

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Biome

The frontend communicates with a Flask API for authentication, analysis, history, teams, risk scoring, and other application functionality.

## Getting Started

### Requirements

- Bun
- A running instance of the UUU Flask API

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

### Production Build

```bash
bun run build
```

### Preview

```bash
bun run preview
```

### Linting and Formatting

Check the project:

```bash
bun run lint
```

Apply Biome fixes:

```bash
bun run lint:fix
```

## Project Structure

```text
src/
├── components/     # Shared and route-specific UI components
├── hooks/          # React hooks
├── lib/            # API requests, types, utilities, and shared logic
└── routes/         # TanStack Router file-based routes
```

Route-specific components live under:

```text
src/components/<route-name>/
```

## Routing

The application uses TanStack Router with file-based routing.

Public routes include:

- `/` - Landing page
- `/pricing` - Pricing

Application routes include analysis, history, risk, code map, teams, API keys, and other authenticated functionality.

## API

API requests are centralized through the frontend API client and request helpers in `src/lib/`.

The frontend expects the Flask backend to provide the corresponding API endpoints and authentication.

## Development Guidelines

Project-specific development conventions and agent instructions are documented in [`AGENTS.md`](./AGENTS.md).

Before completing a change:

```bash
bun run lint
bun run build
```
