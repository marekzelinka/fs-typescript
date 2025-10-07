export interface User {
	username: string;
	email: string;
}

class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

function isString(arg: unknown) {
	return typeof arg === "string" || arg instanceof String;
}

function parseUsername(username: unknown) {
	if (!username || !isString(username)) {
		throw new ValidationError(
			`Invalid or missing username: "${JSON.stringify(username)}"`,
		);
	}

	return String(username);
}

function parseEmail(email: unknown) {
	if (!email || !isString(email) || !email.includes("@")) {
		throw new ValidationError(
			`Invalid or missing email: "${JSON.stringify(email)}"`,
		);
	}

	return String(email);
}

export function validateUser(data: unknown): User {
	if (typeof data !== "object" || data === null) {
		throw new ValidationError("Missing user data");
	}

	if ("username" in data && "email" in data) {
		return {
			username: parseUsername(data.username),
			email: parseEmail(data.email),
		};
	}

	throw new ValidationError("Invalid user data");
}

if (import.meta.main) {
	// Valid case
	const data = {
		username: "mzelinka",
		email: "mzelinka@example.com",
	};
	const parsedData = validateUser(data);
	console.log(parsedData);

	// Invalid case
	const data2 = {
		username: 1231,
		email: "mzelinkaexample.com",
	};
	const parsedData2 = validateUser(data2);
	console.log(parsedData2);
}
