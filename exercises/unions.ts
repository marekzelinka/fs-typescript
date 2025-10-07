import * as z from "zod";

export const UnionSchema = z.union([
	z.literal("anonymous"),
	z.object({ id: z.number(), name: z.string() }),
]);
