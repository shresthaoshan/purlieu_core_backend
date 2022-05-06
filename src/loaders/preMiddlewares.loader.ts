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
	app.use(
		cors({
			origin: ["http://localhost", "http://localhost:3005", "http://localhost:3000", "https://purlieu-core-frontend.vercel.app"],
			methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
		})
	);
	app.use(json());
	console.log("PRE MIDDLEWARES:: ✅");
};
