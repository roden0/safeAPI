import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema } from 'zod';

export function validateWithZod({
  params,
  body,
  query
}: {
  params?: ZodSchema<any>,
  body?: ZodSchema<any>,
  query?: ZodSchema<any>
}) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    if (params) {
      const parsed = params.safeParse(request.params);
      if (!parsed.success) {
        return reply.code(400).send({
          message: 'Invalid URL parameters',
          errors: parsed.error.errors,
        });
      }
      (request as any).validatedParams = parsed.data;
    }
    if (body) {
      const parsed = body.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }
      (request as any).validatedBody = parsed.data;
    }
    if (query) {
      const parsed = query.safeParse(request.query);
      if (!parsed.success) {
        return reply.code(400).send({
          message: 'Invalid query parameters',
          errors: parsed.error.errors,
        });
      }
      (request as any).validatedQuery = parsed.data;
    }
  };
}
