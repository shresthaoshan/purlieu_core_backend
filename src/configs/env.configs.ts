import dotenv, { DotenvParseOutput } from "dotenv";
import Container from "typedi";

(() => {
	const envNames = ["PORT", "NODE_ENV", "NAME", "ENDPOINT_ENTRY", "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET"];
	const { parsed: envs, error } = dotenv.config({
		debug: process.env.NODE_ENV !== "production",
		override: true,
	});

	if (error) throw error;
	if (!envs) throw new Error("Environment Variables not set properly.");

	envNames.forEach((name) => {
		if (!(envs as any)[name]) throw new Error(`Environment Variable for '${name}' is required.`);
	});

	Container.set("envs", envs);
	console.log(`ENV VARS [${Object.keys(envs).length}]: ✅`);
})();

export default Container.get("envs") as DotenvParseOutput;
