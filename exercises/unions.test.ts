import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { UnionSchema } from "./unions.ts";

describe("Schema", () => {
	it("should pass with literal string", () => {
		assert.doesNotThrow(() => UnionSchema.parse("anonymous"));
	});

	it("should pass with data object", () => {
		assert.doesNotThrow(() => UnionSchema.parse({ id: 1, name: "Ada" }));
	});

	it("should fail when data object is invalid", () => {
		assert.throws(() => UnionSchema.parse({ id: "wrong", name: "Marvin" }));
	});
});
