import { AuthedRequest, Handler } from "express";
import { AuthError } from "modules/auth/auth.utils";
import Container, { Service } from "typedi";
import AdminService from "./admin.service";

@Service()
export default class AdminController {
	constructor(private readonly service = Container.get(AdminService)) {}

	getHome: Handler = async (req, res) => {
		res.json({
			check: true,
			user: (req as AuthedRequest).auth,
		});
	};

	getRefreshToken: Handler = async (req, res) => {
		const { refreshToken } = req.body;
		if (!refreshToken.length) throw new AuthError("Refresh Token required.", 400);
		const response = await this.service.refresh(refreshToken);
		res.json(response);
	};

	postCreate: Handler = async (req, res, next) => {
		const { email = "", password = "" } = req.body;
		if (!email.length || !password.length) throw new Error("All fields are required.");
		await this.service.create(email, password);
		this.postLogin(req, res, next);
	};

	postLogin: Handler = async (req, res) => {
		const { email = "", password = "" } = req.body;
		if (!email.length || !password.length) throw new AuthError("All fields are required.");
		const response = await this.service.login(email, password);
		res.json(response);
	};
}
