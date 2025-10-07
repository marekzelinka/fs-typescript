import * as z from "zod";

export const LiteralSchema = z.literal("OK");

export const ColorSchema = z.enum(["RED", "GREEN", "BLUE"]);

export const GetMessageReturnSchema = z.tuple([z.string(), z.number()]);

export const BaseUserSchema = z.object({
	id: z.uuid(),
	createdAt: z.date(),
});

export const CustomerSchema = BaseUserSchema.extend({
	type: z.literal("customer"),
	orders: z.array(z.object({ orderId: z.uuid() })),
});

export const AdminSchema = BaseUserSchema.extend({
	type: z.literal("admin"),
	permissions: z.array(z.string()),
});

// z.discriminatedUnion benefits over z.union: performance, clarify (if your
// input type is incorrect, you'll get an immediate error)
export const UserSchema = z.discriminatedUnion("type", [
	CustomerSchema,
	AdminSchema,
]);

export type User = z.infer<typeof UserSchema>;

if (import.meta.main) {
	try {
		LiteralSchema.parse("k");
		ColorSchema.parse("RED");
		ColorSchema.parse("PURPLE");
		GetMessageReturnSchema.parse(["mzelinka", 1]);
		UserSchema.parse({
			id: "abe90c5a-d454-42e0-8764-2bc10e4f0f64",
			permissions: ["all:products", "all:customers"],
		});
	} catch (error) {
		// console.log(error instanceof z.error);
		if (error instanceof z.ZodError) {
			console.error("Validation errors:");
			console.error(z.prettifyError(error));
		}
	}
}
