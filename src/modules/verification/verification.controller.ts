import Container, { Service } from "typedi";
import { Handler } from "express";

import { KhaltiService } from "services/payments/khalti";
import { StripeService } from "services/payments/stripe";
import HistoryService from "modules/capps/history/history.service";

import { PaymentVerificationRequest } from "types/verification";
import CAppsService from "modules/capps/capps.service";
import axios from "axios";

@Service()
export default class VerificationController {
	constructor(
		private readonly cappsService = Container.get(CAppsService),
		private readonly khaltiService = Container.get(KhaltiService),
		private readonly stripeService = Container.get(StripeService),
		private readonly historyService = Container.get(HistoryService)
	) {}

	postVerifyKhalti: Handler = async (req, res) => {
		const { amount, receipent, remarks, token } = req.body as PaymentVerificationRequest;
		const appId = (req as any).appAssociated?.id || "";

		const app = await this.cappsService.findById(appId);

		if (!app) throw new Error("App not found.");

		if (!token || !token.length) throw new Error("Payment token is required.");

		console.log({ appId, amount, receipent, remarks, token });

		const { data }: any = await this.khaltiService.verify({ amount, token });

		console.log({ data });

		const { amount: verifiedAmount, idx } = data;

		const response = await this.historyService.create(idx, appId, receipent, verifiedAmount, "KHALTI", remarks, "TOPUP");

		if (app.callbackUrl?.length) {
			axios
				.post(
					app.callbackUrl,
					{
						idx,
						receipent,
						verifiedAmount,
						gateway: "KHALTI",
						remarks,
						type: "TOPUP",
					},
					{
						headers: {
							Authorization: app.id,
						},
					}
				)
				.catch((err) => console.log({ err }));
		}

		res.json(response);
	};

	postVerifyStripe: Handler = async (req, res) => {
		const { amount, receipent, remarks, token } = req.body as PaymentVerificationRequest;
		const appId = (req as any).appAssociated.id;

		if (!token || !token.length) throw new Error("Payment token is required.");

		const { amount: verifiedAmount, idx }: any = await this.stripeService.verify({ amount, token });

		const response = await this.historyService.create(idx, appId, receipent, verifiedAmount, "STRIPE", remarks, "TOPUP");

		res.json(response);
	};
}
