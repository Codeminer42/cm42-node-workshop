import { FastifyRequest } from "fastify";
import z, { ZodSchema } from "zod";

export const validateRequest = <T extends ZodSchema>(
  request: FastifyRequest,
  schema: T
): Promise<z.infer<T>> => schema.parseAsync(request);
