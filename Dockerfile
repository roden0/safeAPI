# Dockerfile for safeAPI

# ---- TypeScript Build Stage (compile TS to JS) ----
FROM node:24.0.2-slim AS tsc-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=src/infrastructure/prisma/schema.prisma
RUN npm run build

# ---- Production Stage (run compiled JS only) ----
FROM node:24.0.2-slim AS prod
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY --from=tsc-build /app/package*.json ./
COPY --from=tsc-build /app/node_modules ./node_modules
COPY --from=tsc-build /app/public ./public
COPY --from=tsc-build /app/src/infrastructure/prisma ./prisma
RUN npx prisma generate --schema=prisma/schema.prisma
COPY --from=tsc-build /app/.env.example ./
COPY --from=tsc-build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/interfaces/routes/index.js"]
EXPOSE 3000
