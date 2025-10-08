import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as z from "zod";
import { UserProfileSchema } from "./nested-objects.ts";

describe("UserProfileSchema", () => {
	it("should pass with one address", () => {
		assert.doesNotThrow(() =>
			UserProfileSchema.parse({
				name: "Ada",
				addresses: [
					{ street: "1900 Sea St", city: "Los Angeles", zip: "12345" },
				],
			}),
		);
	});

	it("should pass with multiple addresses", () => {
		assert.doesNotThrow(() =>
			UserProfileSchema.parse({
				name: "Ada",
				addresses: [
					{ street: "1900 Sea St", city: "Los Angeles", zip: "12345" },
					{ street: "3 Admiral St", city: "New York", zip: "12531" },
				],
			}),
		);
	});

	it("should fail with no addresses", () => {
		assert.throws(
			() =>
				UserProfileSchema.parse({
					name: "Ada",
					addresses: [],
				}),
			z.ZodError,
		);
	});
});
