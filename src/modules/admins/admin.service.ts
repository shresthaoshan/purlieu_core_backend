import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { sha512 } from "hash.js";
import tokenUtils from "utils/token.utils";

@Service()
export default class AdminService {
	constructor(@Inject("db") private readonly db: PrismaClient) {}

	create = async (email: string, password: string) => {
		const alreadyExist = await this.db.admins.findFirst({ where: { email } });
		if (alreadyExist) throw new Error("Email already in use.");

		const hashedPassword = sha512()
			.update("1234--" + password)
			.digest("hex");

		const newAdmin = await this.db.admins.create({
			data: {
				email,
				password: hashedPassword,
				username: email.split("@")[0],
			},
		});
		return { username: newAdmin.username };
	};

	login = async (email: string, password: string) => {
		const userExists = await this.db.admins.findFirst({ where: { email } });
		if (!userExists) throw new Error("User does not exist.");

		const hashedPassword = sha512()
			.update("1234--" + password)
			.digest("hex");

		if (hashedPassword !== userExists.password) throw new Error("Credential invalid.");

		const payload = { username: userExists.username, email: userExists.email, verified: userExists.verified };

		const refreshToken = (await tokenUtils.signRefreshToken(payload)) as string;

		await this.db.admins.update({
			data: { tokens: { push: refreshToken } },
			where: { email },
		});

		return {
			accessToken: await tokenUtils.signAccessToken(payload),
			refreshToken,
		};
	};

	refresh = async (refreshToken: string) => {
		const { username, email, verified }: any = await tokenUtils.verifyRefreshToken(refreshToken);

		const userExists = await this.db.admins.findFirst({ where: { email } });
		if (!userExists) throw new Error("Corrupted token.");

		const tokenExists = userExists.tokens.includes(refreshToken);
		if (!tokenExists) {
			await this.db.admins.update({ data: { tokens: [] }, where: { email } });
			throw new Error("Corrupted token.");
		}

		const payload = { username, email, verified };
		const newRefreshToken = (await tokenUtils.signRefreshToken(payload)) as string;

		await this.db.admins.update({
			data: { tokens: [...userExists.tokens.filter((item) => item !== refreshToken), newRefreshToken] },
			where: { email },
		});

		return {
			accessToken: await tokenUtils.signAccessToken(payload),
			refreshToken: newRefreshToken,
		};
	};
}
