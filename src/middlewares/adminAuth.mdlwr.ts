import { NextFunction, Request, Response } from "express";
import tokenUtils from "utils/token.utils";

// eslint-disable-next-line
export default async (req: Request, _: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) throw new Error("Authorization failed. Auth token missing.");

	const [authType, token] = authorization.split(" ");

	if (!authType?.length) throw new Error("Authorization failed. Invalid auth-type.");
	if (!token?.length) throw new Error("Authorization failed. Invalid token package.");

	const validToken = await tokenUtils.verifyAccessToken(token);
	if (!validToken) throw new Error("Authorization failed. Token verification failed.");

	next();
};
