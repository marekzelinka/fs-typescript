import * as z from "zod";

const UserSchema = z.object({
	username: z.string(),
	email: z.email(),
});

type User = z.infer<typeof UserSchema>;

function parseUser(data: unknown): User {
	return UserSchema.parse(data);
}

if (import.meta.main) {
	try {
		// Valid case
		const data2 = {
			username: "mzelinka",
			email: "mzelinka@example.com",
		};
		const user2 = parseUser(data2);
		console.log(user2);

		// Invalid case
		const data = {
			username: 123,
			email: "mzelinkaexample.com",
		};
		const user = parseUser(data);
		console.log(user);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Validation errors:");
			console.error(z.prettifyError(error));
		}
	}
}
