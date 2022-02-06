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

export {};
