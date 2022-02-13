import { PrismaClient } from "@prisma/client";
import { sha512 } from "hash.js";
import { nanoid } from "nanoid";
import { Inject, Service } from "typedi";

@Service()
export default class CAppsService {
	constructor(@Inject("db") private readonly db: PrismaClient) {}
	create = async (name: string, admin: string) => {
		const id = nanoid(10);

		const apiSecretRaw = sha512()
			.update(`${name}@${admin}:${nanoid(13)}`)
			.digest("hex");
		const apiSecret = sha512().update(apiSecretRaw).digest("hex");

		const app = await this.db.cApps.create({
			data: {
				id,
				name,
				apiKey: id,
				apiSecret,
				admin: { connect: { username: admin } },
			},
			select: {
				apiKey: true,
			},
		});
		return {
			...app,
			apiSecret: apiSecretRaw,
		};
	};

	list = async (adminId: string) => {
		const apps = await this.db.cApps.findMany({
			where: {
				adminId: adminId,
			},
			select: {
				id: true,
				name: true,
				adminId: true,
				registeredOn: true,
				callbackUrl: true,
			},
		});

		return apps;
	};

	updateCallbackUrl = async (appId: string, callbackUrl: string) => {
		const updated = await this.db.cApps.update({
			where: {
				id: appId,
			},
			data: {
				callbackUrl,
			},
			select: {
				callbackUrl: true,
			},
		});

		return updated;
	};
}
