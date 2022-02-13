import { NextFunction, Request, Response } from "express";
import { AuthError, verifyAuthToken } from "modules/auth/auth.utils";

// eslint-disable-next-line
export default async (req: Request, _: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) throw new AuthError("Authorization failed. Auth token missing.");

	const [authType, token] = authorization.split(" ");

	if (!authType?.length) throw new AuthError("Authorization failed. Invalid auth-type.");
	if (!token?.length) throw new AuthError("Authorization failed. Invalid token package.");

	const validToken = await verifyAuthToken(token);
	if (!validToken) throw new AuthError("Authorization failed. Token verification failed.");

	(req as any).auth = validToken;

	next();
};
