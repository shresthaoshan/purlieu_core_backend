import { Application } from "express";
import Container from "typedi";
import { json, urlencoded } from "express";
import cors from "cors";

export default async () => {
	const app: Application = Container.get("server");

	app.use(
		urlencoded({
			extended: false,
		})
	);
	app.use(cors());
	app.use(json());
	console.log("PRE MIDDLEWARES:: ✅");
};
