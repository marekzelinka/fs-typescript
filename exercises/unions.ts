import * as z from "zod";

export const UnionDataSchema = z.union([
	z.literal("anonymous"),
	z.object({ id: z.number(), name: z.string() }),
]);

export type UnionData = z.infer<typeof UnionDataSchema>;
