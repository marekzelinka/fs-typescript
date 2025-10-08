import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";
import { load } from "js-yaml";
import * as z from "zod";

export const AppConfigSchema = z.object({
	server: z.object({
		host: z.string({ error: "Host must be a string" }).default("localhost"),
		port: z.coerce
			.number({ error: "Port must be a number" })
			.positive({ error: "Port must be greater than 0" })
			.default(3000),
	}),
	database: z.object({
		url: z.url({
			protocol: /^postgresql$/,
			error: "Invalid postgres database url format",
		}),
		username: z
			.string({ error: "Username must be string" })
			.trim()
			.nonempty({ error: "Username is required" }),
		password: z
			.string({ error: "Password must be string" })
			.trim()
			.nonempty({ error: "Password is required" }),
	}),
	featureFlags: z
		.record(
			z.string({ error: "Flag label must be a string" }),
			z.boolean({ error: "Flag value must be a boolean" }),
		)
		.optional(),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export async function loadAppConfig(configPath: string): Promise<AppConfig> {
	try {
		const configURL = import.meta.resolve(configPath);
		const configFile = await readFile(fileURLToPath(configURL), "utf-8");
		const configData = load(configFile);

		return AppConfigSchema.parse(configData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Application configuration validation failed:");
			console.error(z.prettifyError(error));
		} else {
			console.error("Error loading application configuration", error);
		}

		throw new Error("Failed to load application configuration.");
	}
}

if (import.meta.main) {
	const appConfig = await loadAppConfig("./config.yaml");

	console.log("Loaded app configuration:");
	console.log(appConfig);

	console.log(styleText(["bold"], "Server host:"), appConfig.server.host);
	console.log(styleText(["bold"], "Database URL:"), appConfig.database.url);
}
