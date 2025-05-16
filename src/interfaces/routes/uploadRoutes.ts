import { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fs from 'fs';
import path from 'path';

export async function uploadRoutes(fastify: FastifyInstance) {
  fastify.register(fastifyMultipart);

  fastify.post('/upload/avatar', async function (request, reply) {
    const data = await request.file();
    if (!data) {
      return reply.code(400).send({ message: 'No file uploaded' });
    }
    const uploadDir = path.join(__dirname, '../../../public/avatars');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, data.filename);
    // Save the file using a stream
    const writeStream = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      data.file.pipe(writeStream);
      data.file.on('end', resolve);
      data.file.on('error', reject);
    });
    // Return the relative path for storing in DB
    return reply.send({ path: `/avatars/${data.filename}` });
  });
}
