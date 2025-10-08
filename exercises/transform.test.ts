import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as z from "zod";
import { DateStringSchema } from "./transform.ts";

describe("DateString", () => {
	const validStringDate = "2025-03-20";

	it("should pass if the value is a string and a valid date", () => {
		assert.doesNotThrow(() => DateStringSchema.parse(validStringDate));
	});

	it("should pass and transform the argument to a Date type (and not a string)", () => {
		const result = DateStringSchema.parse(validStringDate);

		assert.equal(result instanceof Date, true);
	});

	it("should fail if the string is not a date", () => {
		assert.throws(() => DateStringSchema.parse("Dec 10th, 2025"), z.ZodError);
	});
});
