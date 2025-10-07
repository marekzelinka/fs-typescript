import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HexColorSchema } from "./custom.ts";

describe("HexColorSchema", () => {
	it("should pass with a valid hex color", () => {
		assert.doesNotThrow(() => HexColorSchema.parse("#FFFFFF"));
		assert.doesNotThrow(() => HexColorSchema.parse("#fff"));
		assert.doesNotThrow(() => HexColorSchema.parse("#000"));
		assert.doesNotThrow(() => HexColorSchema.parse("#abc"));
	});

	it("should fails with invalid string", () => {
		assert.throws(() => HexColorSchema.parse("#FFFFFFFFFF"));
		assert.throws(() => HexColorSchema.parse("#1234567"));
		assert.throws(() => HexColorSchema.parse("123456"));
		assert.throws(() => HexColorSchema.parse("blue"));
		assert.throws(() => HexColorSchema.parse("gray"));
	});
});
