import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DateStringSchema } from "./refining-types.ts";

describe("DateStringSchema", () => {
	it("should parse a valid date", () => {
		assert.doesNotThrow(() => DateStringSchema.parse("2025-03-20"));
	});

	it("should throw on invalid date", () => {
		assert.throws(() => DateStringSchema.parse("Feb 30th, 2025"));
	});
});
