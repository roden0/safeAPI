import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { userRoutes } from './userRoutes.js';
import { uploadRoutes } from './uploadRoutes.js';
import { healthRoutes } from './healthRoutes.js';

const app = Fastify();

// Serve static files (avatars)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.register(fastifyStatic, {
  root: path.join(__dirname, '../../../public'),
  prefix: '/',
});

app.register(healthRoutes);
app.register(userRoutes);
app.register(uploadRoutes);

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
