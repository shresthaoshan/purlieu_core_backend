import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line
export default async (err: Error, _: Request, res: Response, next: NextFunction) => {
	res.json({
		error: err.message,
		details: err,
	});
	// next(err);
};
