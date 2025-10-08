import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as z from "zod";
import { UserSchema } from "./schemas.ts";

describe("UserSchema", () => {
	it("should pass with valid data", () => {
		assert.doesNotThrow(() => UserSchema.parse({ name: "Ada", age: 36 }));
	});

	it("should fail when age is missing", () => {
		assert.throws(() => UserSchema.parse({ name: "Charles" }), z.ZodError);
	});

	it("should fail when age is negative", () => {
		assert.throws(
			() => UserSchema.parse({ name: "Boddy Tables", age: -1 }),
			z.ZodError,
		);
	});
});
