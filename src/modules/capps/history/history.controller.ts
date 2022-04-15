import { Handler } from "express";
import Container, { Service } from "typedi";
import HistoryService from "./history.service";

@Service()
export default class HistoryController {
	constructor(private readonly service = Container.get(HistoryService)) {}

	check: Handler = async (_, res) => {
		const appId = _.params.id as string;
		const response = await this.service.list(appId);
		res.json(response);
	};
}
