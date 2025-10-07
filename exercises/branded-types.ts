import * as z from "zod";

export const UserIdSchema = z
	.uuid({ version: "v4", error: "Invalid UUID format" })
	.brand<"UserId">();

export type UserId = z.infer<typeof UserIdSchema>;

function getUser(id: UserId) {
	const user = {};

	return { id, ...user };
}

const validUUID = "abe90c5a-d454-42e0-8764-2bc10e4f0f64";

// @ts-expect-error Typescirpt will complain here because we set the type to a
// branded one, and validUUID is of type string
getUser(validUUID);

const userId = UserIdSchema.parse(validUUID);

// TypeScript will not complain here, because we parsed the UUID and than
// provide the result as the argument
getUser(userId);
