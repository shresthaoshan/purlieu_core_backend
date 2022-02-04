import envConfigs from "configs/env.configs";
import { Application } from "express";
import routes from "routes";
import Container from "typedi";

export default async () => {
	const app: Application = Container.get("server");

	// app.get("/", (_, res) => {
	// 	res.json(envConfigs);
	// });

	app.use(envConfigs.ENDPOINT_ENTRY, routes);

	console.log("ROUTES:: ✅");
};
