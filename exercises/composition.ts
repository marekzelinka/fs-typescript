import * as z from "zod";

export const UsernameSchema = z
	.string({ error: "Username must be a string" })
	.trim()
	.min(4, { error: "Username must be at least 4 characters" })
	.max(16, { error: "Username must be less than 16 characters" })
	.regex(/^[a-zA-Z0-9_]+$/, {
		error: "Username can only include letters, numbers, and underscores",
	})
	// Users can type the username in any case, but we store it in lowercase
	.transform((value) => value.toLowerCase());

export const EmailSchema = z
	.email({ error: "invalid email format" })
	.nonempty({ error: "Email is required" })
	// Users can type the email in any case, but we store it in lowercase
	.transform((arg) => arg.toLowerCase());

export const PasswordSchema = z
	.string({ error: "Password must be a string" })
	.trim()
	.min(8, { error: "Password must be at least 8 characters" })
	.regex(/\d+/, { error: "Password must contain a digit" });

export const BirthDateSchema = z.coerce
	.date({ error: "Invalid date format" })
	.optional();

export const AddressSchema = z.object({
	street: z
		.string({ error: "Street name must be a string" })
		.trim()
		.nonempty("Street name cannot be empty"),
	city: z
		.string({ error: "City name must be a string" })
		.trim()
		.nonempty({ error: "City name cannot be empty" }),
	zip: z
		.string({ error: "Zip code must be a string" })
		.length(5, { error: "Zip code must be exactly 5 characters" }),
});

export const RegisterFormSchema = z.object({
	username: UsernameSchema,
	email: EmailSchema,
	password: PasswordSchema,
	birthDate: BirthDateSchema,
	addresses: z
		.array(AddressSchema, { error: "Invalid addresses format" })
		.optional(),
});

export const LoginFormSchema = RegisterFormSchema.pick({
	email: true,
	password: true,
});
