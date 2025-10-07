import * as z from "zod";

export const UserIdSchema = z
	.uuid({
		version: "v4",
		error: "Invalid ID format",
	})
	.brand<"UserId">();

export type UserId = z.infer<typeof UserIdSchema>;

function getUser(id: UserId) {
	return { id, data: {} };
}

export const AddressSchema = z.object({
	street: z.string(),
	zipCode: z.string().length(5),
});

export const UserSchema = z.object({
	id: UserIdSchema,
	name: z.string(),
	email: z.email().refine((arg) => arg.endsWith("frontendmasters.com"), {
		error: "Email must end with frontendmasters.com",
	}),
	age: z.int().positive(),
	addresses: z.array(AddressSchema).nonempty(),
});

export type User = z.infer<typeof UserSchema>;

export const DateStringSchema = z.custom<string>(
	(data) => {
		if (typeof data !== "string") {
			return false;
		}

		// Attempt to parse date
		const date = new Date(data);

		// Check if it's a real date
		return !Number.isNaN(date.valueOf());
	},
	{
		error: "Invalid date string provided",
	},
);

export type DateString = z.infer<typeof DateStringSchema>;

if (import.meta.main) {
	try {
		const userId = UserIdSchema.parse("7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9");
		// Without .brand<"UserId">(), the type of UserId would be string, now we
		// force out API to only accept a parsed UUID
		getUser(userId);

		DateStringSchema.parse("2025-03-20");
		DateStringSchema.parse("not-a-date");

		const parsedUser = UserSchema.parse({
			id: "7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9",
			name: "Ada Lovelace",
			email: "adal@example.com",
			age: 36,
			addresses: [
				{ street: "1900 Sea St", zipCode: "12345" },
				{ street: "3 Admiral St", zipCode: "12531" },
			],
		});
		console.log(parsedUser);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Validation errors:");
			console.error(z.prettifyError(error));
		}
	}
}
