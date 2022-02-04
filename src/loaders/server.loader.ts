import express from "express";
import "express-async-errors";

import Container from "typedi";

export default async () => {
	const server = express();

	Container.set("server", server);
	console.log("SERVER:: ✅");
};
