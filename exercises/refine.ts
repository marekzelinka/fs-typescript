import * as z from "zod";

export const QuantityScehma = z
	.int({ error: "Quantity must be a number in safe integer range" })
	.min(2, { error: "Quantity must be 2 or greater than 2" })
	.max(999, { error: "Quantity must be less than 999" })
	.refine(isPrime, { error: "Quantity must be a prime" });

export type Quantity = z.infer<typeof QuantityScehma>;

function isPrime(number: number): boolean {
	if (number < 2) {
		return false;
	}

	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) {
			return false;
		}
	}

	return true;
}
