import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  avatar: z.string().min(1),
});

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  avatar: z.string().min(1).optional(),
});
