import tokenUtils from "utils/token.utils";
import { AuthPackage } from "./auth.model";

export const verifyAuthToken = (token: string) => tokenUtils.verifyAccessToken(token) as Promise<AuthPackage | null>;

export class AuthError implements Error {
	code: number;
	name: string;
	message: string;
	constructor(message: string, code?: number, name?: string) {
		this.name = name ?? "AuthError";
		this.code = code || 401;
		this.message = message;
	}
}
