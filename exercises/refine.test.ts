import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { QuantityScehma } from "./refine.ts";

describe("QuantityScehma", () => {
	it("should pass when parsing a prime number", () => {
		assert.doesNotThrow(() => QuantityScehma.parse(2));
	});

	it("should fail when parsing a non prime number", () => {
		assert.throws(() => QuantityScehma.parse(6));
	});
});
