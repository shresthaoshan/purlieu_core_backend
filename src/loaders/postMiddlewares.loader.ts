import { Application } from "express";
import errorHandlerMdlwr from "middlewares/errorHandler.mdlwr";
import Container from "typedi";

export default async () => {
	const app: Application = Container.get("server");

	app.use(errorHandlerMdlwr);
	console.log("POST MIDDLEWARES:: ✅");
};
