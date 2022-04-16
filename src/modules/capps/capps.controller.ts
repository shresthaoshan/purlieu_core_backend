import { AuthedRequest, Handler } from "express";
import Container, { Service } from "typedi";
import CAppsService from "./capps.service";

@Service()
export default class CAppsController {
	constructor(private readonly service = Container.get(CAppsService)) {}

	getHome: Handler = async (_, res) => {
		res.json({
			check: true,
		});
	};

	getAppDetails: Handler = async (req, res) => {
		const appId = req.params.id as string;
		const response = await this.service.findById(appId);
		res.json(response);
	};

	postCreate: Handler = async (req, res) => {
		const { name = "" } = req.body;

		if (!name.length) throw new Error("Name of application required.");

		const response = await this.service.create(name, (req as AuthedRequest).auth.username);
		res.json(response);
	};

	getList: Handler = async (req, res) => {
		const response = await this.service.list((req as AuthedRequest).auth.username);

		res.json(response);
	};

	postUpdateCallbackUrl: Handler = async (req, res) => {
		const id = req.params.id || "";
		const { callbackUrl = "" } = req.body;

		if (!callbackUrl.length) throw new Error("Callback url is required.");

		const response = await this.service.updateCallbackUrl(id, callbackUrl);
		res.json(response);
	};
}
