# safeAPI

## Project Structure

```
src/
  domain/
    entities/         # Domain entities (TypeScript interfaces/classes)
    valueObjects/     # Value objects encapsulating business rules
    repositories/     # Repository interfaces for data access
  application/
    useCases/         # Core business use cases
  infrastructure/
    models/           # Prisma database models
    prisma/           # Prisma config and connection
    websocket/        # WebSocket setup
  interfaces/
    routes/           # Fastify API routes
    middleware/       # JWT, PKCE authentication logic
    controllers/      # Transform data between domain and routes
    validators/       # Zod validation schemas
  config/             # Config settings, env, DB setup
  utils/              # Utility functions
swagger/              # Fastify Swagger docs

tests/                # Unit tests (Jest)
```

## Principles & Conventions
- **SOLID**: Each module/class/function has a single responsibility, uses interfaces, and is open for extension.
- **DRY**: Common logic in `utils/`, centralized config.
- **KISS**: Favor readability and concise functions.
- **DDD**: Clear domain model, explicit rules, domain services for complex logic.

## Key Features
- **OAuth 2.0 PKCE Authentication**: Fastify plugins, JWT, and PKCE in `middleware/`.
- **WebSockets**: Fastify WebSocket for event-driven messaging.
- **Unit Testing**: Jest for application logic and domain models.
- **Swagger Docs**: Fastify Swagger plugin for automated API docs.

## Getting Started
1. Clone the repo
2. Install dependencies: `npm install`
3. Set up environment variables: copy `.env.example` to `.env`
4. Initialize the database: `npx prisma migrate dev`
5. Start the dev server: `npm run dev`

## Testing
- Run all tests: `npm test`

---

For more details, see each folder's `README.md`.