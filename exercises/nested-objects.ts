import * as z from "zod";

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

export type Address = z.infer<typeof AddressSchema>;

export const UserProfileSchema = z.object({
	name: z
		.string({ error: "Name must be a string" })
		.trim()
		.nonempty({ error: "Name can't be empty" }),
	addresses: z
		.array(AddressSchema)
		.nonempty({ error: "At least one address is required" }),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
