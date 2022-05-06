import { PrismaClient, TransactionType } from "@prisma/client";
import { nanoid } from "nanoid";
import { Inject, Service } from "typedi";

@Service()
export default class HistoryService {
	constructor(@Inject("db") private readonly db: PrismaClient) {}
	private readonly selectAppName = {
		app: {
			select: {
				name: true,
			},
		},
	};

	list = async (appId: string) => {
		const histories = await this.db.history.findMany({
			where: {
				appId,
			},
			include: this.selectAppName,
		});
		return histories;
	};

	create = async (
		transactionId: string,
		appId: string,
		receipient: string,
		topupAmount: number,
		serviceProvider: string,
		remarks: string,
		type?: TransactionType
	) => {
		const id = nanoid(10);
		const newHistory = await this.db.history.create({
			data: {
				id,
				transactionId,
				appId: appId,
				topupId: receipient,
				value: topupAmount,
				serviceProvider,
				remarks,
				type,
			},
			include: this.selectAppName,
		});
		return newHistory;
	};
}
