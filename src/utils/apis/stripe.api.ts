import axios from "axios";
import stripeConfig from "configs/payment.providers/stripe.config";

const stripeApi = axios.create({
	baseURL: stripeConfig.STRIPE_API,
});

stripeApi.interceptors.response.use(
	(resp) => resp.data,
	(err) => err.response?.data || err
);

export default stripeApi;
