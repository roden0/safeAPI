import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema } from 'zod';

export function validateParams(schema: ZodSchema<any>) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const parse = schema.safeParse(request.params);
    if (!parse.success) {
      return reply.code(400).send({
        message: 'Invalid URL parameters',
        errors: parse.error.errors,
      });
    }
    // Attach parsed params to request for downstream use if needed
    (request as any).validatedParams = parse.data;
  };
}
