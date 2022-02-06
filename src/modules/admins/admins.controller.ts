import { Handler } from "express";
import Container, { Service } from "typedi";
import AdminService from "./admin.service";

@Service()
export default class AdminController {
	constructor(private readonly service = Container.get(AdminService)) {}

	getHome: Handler = async (_, res) => {
		res.json({
			check: true,
		});
	};

	postCreate: Handler = async (req, res) => {
		const { email = "", password = "" } = req.body;
		if (!email.length || !password.length) throw new Error("Some fields are empty.");
		const response = await this.service.create(email, password);
		res.json(response);
	};

	postLogin: Handler = async (req, res) => {
		const { email = "", password = "" } = req.body;
		if (!email.length || !password.length) throw new Error("Some fields are empty.");
		const response = await this.service.login(email, password);
		res.json(response);
	};
}
