import * as z from "zod";

export const HelloSchema = z.object({
	name: z
		.string({ error: "Name must be a string" })
		.nonempty("Name can't be empty"),
	age: z
		.number({ error: "Age must be a number" })
		.positive({ error: "Age must be greater than 0" }),
});

if (import.meta.main) {
	try {
		HelloSchema.parse({ name: "Ada", age: 36 });
		HelloSchema.parse({ name: "Charles" });
		HelloSchema.parse({ name: "Boddy Tables", age: -1 });
		console.log("Passed!");
	} catch (error) {
		console.error("Failed with errors:");
		if (error instanceof z.ZodError) {
			console.error(z.prettifyError(error));
		}
	}
}
