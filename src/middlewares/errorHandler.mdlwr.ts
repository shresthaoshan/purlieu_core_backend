import { NextFunction, Request, Response } from "express";
import { AuthError } from "modules/auth/auth.utils";

export default async (err: Error, _: Request, res: Response, next: NextFunction) => {
	if (err instanceof AuthError) {
		res.status(err.code).json({
			error: err.message,
			details: err,
		});
		return;
	}

	res.json({
		error: err.message,
		details: err,
	});
	next(err);
};
