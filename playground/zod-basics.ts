import * as z from "zod";

export const StringSchema = z.string();

export const NumberSchema = z.number();

export const UserSchema = z.object({
	name: z.string().trim().nonempty("Name can't be empty"),
	email: z.email("Invalid email format"),
	age: z
		.number()
		.positive("Age must be greater than 0")
		.max(120, "Age must be less than 120"),
});

export type User = z.infer<typeof UserSchema>;

export const ProductSchema = z.object({
	id: z.uuid("Invalid UUID format"),
	name: z.string().trim().nonempty("Name can't be empty"),
	price: z.number().positive("Price must be greater than 0"),
});

export type Product = z.infer<typeof ProductSchema>;

if (import.meta.main) {
	try {
		// Valid
		console.log(StringSchema.parse("Hello"));
		console.log(NumberSchema.parse(42));
		console.log(
			UserSchema.parse({ name: "Alice", email: "alice@example.com", age: 30 }),
		);

		// Invalid - order matters
		console.log(
			UserSchema.parse({ name: "   ", email: "aliceexample.com", age: -30 }),
		);
		console.log(NumberSchema.parse("42"));
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error(z.prettifyError(error));
		}
	}
}
