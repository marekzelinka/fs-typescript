import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { UserSchema } from "./options.ts";

describe("UserSchema", () => {
	it("should pass with age default to 0", () => {
		assert.doesNotThrow(() => {
			const user = UserSchema.parse({ name: "Ada" });
			console.log(user);
		});
	});

	it("should pass with valid data", () => {
		assert.doesNotThrow(() => UserSchema.parse({ name: "Ada", age: 36 }));
	});

	it("should fail when name and/or age is missing", () => {
		assert.throws(() => UserSchema.parse({}));
	});
});
