import envConfigs from "configs/env.configs";
import { Application } from "express";
import { createServer } from "http";
import Container from "typedi";

export default async () => {
	const app: Application = Container.get("server");

	const server = createServer(app);
	server.listen(envConfigs.PORT, () => console.log("APP:: STARTED! ✅"));
};
