import * as z from "zod";

export const UserSchema = z.object({
	name: z
		.string({ error: "Name must be a string" })
		.nonempty("Name can't be empty"),
	age: z
		.number()
		.positive()
		.optional()
		.transform((arg) => arg ?? 0),
});
