import { AuthPackage } from "modules/auth/auth.model";

declare module "dotenv" {
	interface DotenvParseOutput {
		NAME: string;
		PORT: number;
		NODE_ENV: "production" | "development" | "staging" | "testing";
		ENDPOINT_ENTRY: string;
		ACCESS_TOKEN_SECRET: string;
		REFRESH_TOKEN_SECRET: string;
	}
}

declare module "express" {
	interface AuthedRequest extends Request {
		auth: AuthPackage;
	}
}

export {};
