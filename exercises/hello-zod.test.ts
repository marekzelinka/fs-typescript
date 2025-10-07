import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { UserSchema } from "./hello-zod.ts";

describe("UserSchema", () => {
	it("should pass with valid data", () => {
		assert.doesNotThrow(() => UserSchema.parse({ name: "Ada", age: 36 }));
	});

	it("should fail when age is missing", () => {
		assert.throws(() => UserSchema.parse({ name: "Charles" }));
	});

	it("should fail when age is negative (< 0)", () => {
		assert.throws(() => UserSchema.parse({ name: "Boddy Tables", age: -1 }));
	});
});
