import * as z from "zod";

export const DateStringSchema = z
	.string({ error: "Value must be a string" })
	.refine(
		(arg) => {
			// Attempt to parse date
			const date = new Date(arg);

			// Check if it's a real date
			return !Number.isNaN(date.valueOf());
		},
		{ error: "Invalid date string" },
	)
	.transform((arg) => new Date(arg));

export type DateString = z.infer<typeof DateStringSchema>;
