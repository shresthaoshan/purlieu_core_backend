import { Service } from "typedi";
import stripeApi from "utils/apis/stripe.api";

@Service()
export class StripeService {
	constructor(private readonly api = stripeApi) {}

	verify = (payload: any): Promise<{}> => this.api.post("/", payload);
}
