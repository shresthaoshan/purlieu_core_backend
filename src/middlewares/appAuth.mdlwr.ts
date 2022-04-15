import { NextFunction, Request, Response } from "express";
import { AuthError } from "modules/auth/auth.utils";
import CAppsService from "modules/capps/capps.service";
import Container from "typedi";

const appService = Container.get(CAppsService);

// eslint-disable-next-line
export default async (req: Request, _: Response, next: NextFunction) => {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey || !apiKey.length) throw new AuthError("Authorization failed. API key missing.");

	if (typeof apiKey !== "string") throw new AuthError("Invalid API key.");

	const app = await appService.findById(apiKey);

	(req as any).appAssociated = app;

	next();
};
