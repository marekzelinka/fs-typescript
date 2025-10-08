import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as z from "zod";
import { QuantityScehma } from "./refine.ts";

describe("QuantityScehma", () => {
	it("should pass with a prime number", () => {
		assert.doesNotThrow(() => QuantityScehma.parse(2));
	});

	it("should fail with a non-prime number", () => {
		assert.throws(() => QuantityScehma.parse(6), z.ZodError);
	});
});
