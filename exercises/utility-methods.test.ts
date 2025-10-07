import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	ProfileUpdateSchema,
	PublicProfileSchema,
	UserProfileSchema,
} from "./utility-methods.ts";

describe("UserProfileSchema", () => {
	it("should pass with valid data", () => {
		assert.doesNotThrow(() =>
			UserProfileSchema.parse({
				id: "abe90c5a-d454-42e0-8764-2bc10e4f0f64",
				name: "Ada Lovelace",
				email: "ada@frontendmasters.com",
				addresses: [{ street: "1900 Sea St", zipCode: "12345" }],
				phoneNumber: "+61298765432",
			}),
		);
	});

	it("should fail with invalid data", () => {
		assert.throws(() =>
			UserProfileSchema.parse({
				id: 1,
				name: "   ",
				email: "adafrontendmasters.com",
				addresses: "1900 Sea St, 12345",
				phoneNumber: { country: "us", value: "213-373-4253" },
			}),
		);
	});
});

describe("ProfileUpdateSchema", () => {
	it("should pass parsing valid data", () => {
		assert.doesNotThrow(() =>
			ProfileUpdateSchema.parse({
				name: "Ada Lovelace",
				email: "ada@frontendmasters.com",
				addresses: [{ street: "1900 Sea St", zipCode: "12345" }],
				phoneNumber: "+61298765432",
			}),
		);
	});

	it("should omit id property after parsing", () => {
		const result = ProfileUpdateSchema.parse({
			name: "Ada Lovelace",
			email: "ada@frontendmasters.com",
			addresses: [{ street: "1900 Sea St", zipCode: "12345" }],
			phoneNumber: "+61298765432",
		});

		assert.equal(Object.hasOwn(result, "id"), false);
	});
});

describe("PublicProfileSchema", () => {
	it("should pass parsing valid data", () => {
		assert.doesNotThrow(() =>
			PublicProfileSchema.parse({
				name: "Ada Lovelace",
				addresses: [{ street: "1900 Sea St", zipCode: "12345" }],
			}),
		);
	});

	it("should omit id property after parsing", () => {
		const result = PublicProfileSchema.parse({
			name: "Ada Lovelace",
			addresses: [{ street: "1900 Sea St", zipCode: "12345" }],
		});

		assert.equal(Object.hasOwn(result, "id"), false);
		assert.equal(Object.hasOwn(result, "email"), false);
		assert.equal(Object.hasOwn(result, "phoneNumber"), false);
	});
});
