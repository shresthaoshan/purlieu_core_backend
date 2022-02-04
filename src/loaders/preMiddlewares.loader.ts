import { Application } from "express";
import Container from "typedi";
import { json, urlencoded } from "express";

export default async () => {
	const app: Application = Container.get("server");

	app.use(
		urlencoded({
			extended: false,
		})
	);
	app.use(json());
	console.log("PRE MIDDLEWARES:: ✅");
};
