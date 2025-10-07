import * as z from "zod";

export const AddressSchema = z.object({
	street: z
		.string({ error: "Street name must be a string" })
		.trim()
		.nonempty("Street name cannot be empty"),
	zipCode: z
		.string({ error: "Zip code must be a string" })
		.trim()
		.length(5, { error: "Zip code must be exactly 5 characters" }),
});

export const UserProfileSchema = z.object({
	id: z.uuid({ error: "Invalid ID format" }),
	name: z
		.string({ error: "Name must be a string" })
		.trim()
		.nonempty({ error: "Name is required" }),
	email: z
		.email({ error: "invalid email format" })
		.nonempty({ error: "Email is required" }),
	addresses: z.array(AddressSchema, { error: "Invalid addresses format" }),
	phoneNumber: z.e164({ error: "Invalid phone number format" }),
});

export const ProfileUpdateSchema = UserProfileSchema.omit({ id: true });

export const PublicProfileSchema = UserProfileSchema.pick({
	name: true,
	addresses: true,
});
