import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as z from "zod";
import { LoginFormSchema, RegisterFormSchema } from "./composition.ts";

describe("RegisterFormSchema", () => {
	it("should parse valid form values", () => {
		const validFormValues = {
			birthDate: "1900-01-01T00:00:00.000Z",
			email: "marekzelinka@frontendmasters.com",
			password: "123456689",
			username: "marekzelinka17",
		};
		const parsedFormValues = RegisterFormSchema.parse(validFormValues);

		assert.deepEqual(parsedFormValues, {
			...validFormValues,
			birthDate: new Date(validFormValues.birthDate),
		});
	});

	it("should throw ZodError for invalid/missing form values", () => {
		const invalidFormValues = {
			birthDate: "monday 12th of match, 1998",
			email: "marekzelinka@frontendmasters.com",
			password: "123",
		};

		assert.throws(
			() => RegisterFormSchema.parse(invalidFormValues),
			z.ZodError,
		);

		try {
			RegisterFormSchema.parse(invalidFormValues);
		} catch (error) {
			if (error instanceof z.ZodError) {
				assert.match(error.issues[0]!.message, /username must be a string/i);
				assert.deepEqual(error.issues[0]!.path, ["username"]);

				assert.match(
					error.issues[1]!.message,
					/password must be at least 8 characters/i,
				);
				assert.deepEqual(error.issues[1]!.path, ["password"]);

				assert.match(error.issues[2]!.message, /Invalid date format/i);
				assert.deepEqual(error.issues[2]!.path, ["birthDate"]);
			}
		}
	});
});

describe("LoginFormSchema", () => {
	it("should pass with a valid form values", () => {
		const formData = new FormData();
		formData.append("email", "marekzelinka@frontendmasters.com");
		formData.append("password", "123456689");

		assert.doesNotThrow(() =>
			LoginFormSchema.parse(Object.fromEntries(formData)),
		);
	});

	it("should fail with invalid/missing form values", () => {
		const formData = new FormData();
		formData.append("email", "marekzelinka_frontendmasters.com");
		formData.append("password", "123");

		assert.throws(
			() => LoginFormSchema.parse(Object.fromEntries(formData)),
			z.ZodError,
		);
	});
});
