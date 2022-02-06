import { PrismaClient } from "@prisma/client";
import Container from "typedi";
(() => {
	const dbCLient = new PrismaClient();
	dbCLient.$connect();
	Container.set("db", dbCLient);
	console.log("UTILITIES:: ✅");
})();
