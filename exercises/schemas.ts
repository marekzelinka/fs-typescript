import * as z from "zod";

export const UserSchema = z.object({
	name: z
		.string({ error: "Name must be a string" })
		.nonempty("Name can't be empty"),
	age: z
		.number({ error: "Age must be a number" })
		.positive({ error: "Age must be greater than 0" }),
});

export type User = z.infer<typeof UserSchema>;

if (import.meta.main) {
	try {
		UserSchema.parse({ name: "Ada", age: 36 });
		UserSchema.parse({ name: "Charles" });
		UserSchema.parse({ name: "Boddy Tables", age: -1 });
		console.log("Passed!");
	} catch (error) {
		console.error("Failed with errors:");
		if (error instanceof z.ZodError) {
			console.error(z.prettifyError(error));
		}
	}
}
