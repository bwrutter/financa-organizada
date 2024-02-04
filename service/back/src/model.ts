import { z } from "zod";

export type User = z.infer<typeof $user>;
export const $user = z.object({
  id: z.coerce.bigint(),
  name: z.string().trim().max(50),
  value: z.number().int().positive(),
});
