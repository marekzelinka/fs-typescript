import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { LoginFormSchema, RegisterFormSchema } from "./composition.ts";

describe("RegisterFormSchema", () => {
	it("should pass with a valid form values", () => {
		const formData = new FormData();
		formData.append("username", "marekzelinka17");
		formData.append("email", "marekzelinka@frontendmasters.com");
		formData.append("password", "123456689");
		formData.append("birthDate", "1900-01-01");

		assert.doesNotThrow(() =>
			RegisterFormSchema.parse(Object.fromEntries(formData)),
		);
	});

	it("should pass with a valid/missing form values", () => {
		const formData = new FormData();
		formData.append("email", "marekzelinka_frontendmasters.com");
		formData.append("password", "123");
		formData.append("birthDate", "monday 12th of match, 1998");

		assert.throws(() => RegisterFormSchema.parse(Object.fromEntries(formData)));
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

	it("should pass with a valid/missing form values", () => {
		const formData = new FormData();
		formData.append("email", "marekzelinka_frontendmasters.com");
		formData.append("password", "123");

		assert.throws(() => LoginFormSchema.parse(Object.fromEntries(formData)));
	});
});
