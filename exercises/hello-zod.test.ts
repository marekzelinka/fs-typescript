import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HelloSchema } from "./hello-zod.ts";

describe("Schema data parsing", () => {
	it("should pass with valid data", () => {
		assert.doesNotThrow(() => HelloSchema.parse({ name: "Ada", age: 36 }));
	});

	it("should fail when age is missing", () => {
		assert.throws(() => HelloSchema.parse({ name: "Charles" }));
	});

	it("should fail when age is negative (< 0)", () => {
		assert.throws(() => HelloSchema.parse({ name: "Boddy Tables", age: -1 }));
	});
});
