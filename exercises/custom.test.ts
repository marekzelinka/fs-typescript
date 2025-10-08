import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as z from "zod";
import { HexColorSchema } from "./custom.ts";

describe("HexColorSchema", () => {
	it("should pass with a valid string hex colors", () => {
		assert.doesNotThrow(() => HexColorSchema.parse("#FFFFFF"));
		assert.doesNotThrow(() => HexColorSchema.parse("#fff"));
		assert.doesNotThrow(() => HexColorSchema.parse("#000"));
		assert.doesNotThrow(() => HexColorSchema.parse("#abc"));
	});

	it("should fail with invalid string hex colors", () => {
		assert.throws(() => HexColorSchema.parse("#FFFFFFFFFF"), z.ZodError);
		assert.throws(() => HexColorSchema.parse("#1234567"), z.ZodError);
		assert.throws(() => HexColorSchema.parse("123456"), z.ZodError);
		assert.throws(() => HexColorSchema.parse("blue"), z.ZodError);
		assert.throws(() => HexColorSchema.parse("gray"), z.ZodError);
	});
});
