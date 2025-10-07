import * as z from "zod";

export const HexColorSchema = z.custom<string>(
	(data) => {
		if (typeof data !== "string") {
			return false;
		}

		return /^#[0-9a-f]{3,6}$/i.test(data);
	},
	{
		error: "Invalid hex color",
	},
);
