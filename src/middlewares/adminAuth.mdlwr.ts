import { NextFunction, Request, Response } from "express";
import { AuthError, verifyAuthToken } from "modules/auth/auth.utils";

class TokenError extends AuthError {
	constructor(message: string, code?: number) {
		super(message, code, "TOKEN_ERROR");
	}
}

// eslint-disable-next-line
export default async (req: Request, _: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) throw new TokenError("Authorization failed. Auth token missing.", 400);

	const [authType, token] = authorization.split(" ");

	if (!authType?.length) throw new TokenError("Authorization failed. Invalid auth-type.", 400);
	if (!token?.length) throw new TokenError("Authorization failed. Invalid token package.", 400);

	const validToken = await verifyAuthToken(token);
	if (!validToken) throw new TokenError("Authorization failed. Token verification failed.", 403);

	(req as any).auth = validToken;

	next();
};
