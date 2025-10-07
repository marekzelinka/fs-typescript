import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { UnionDataSchema } from "./unions.ts";

describe("Schema", () => {
	it("should pass with literal string", () => {
		assert.doesNotThrow(() => UnionDataSchema.parse("anonymous"));
	});

	it("should pass with data object", () => {
		assert.doesNotThrow(() => UnionDataSchema.parse({ id: 1, name: "Ada" }));
	});

	it("should fail when data object is invalid", () => {
		assert.throws(() => UnionDataSchema.parse({ id: "wrong", name: "Marvin" }));
	});
});
