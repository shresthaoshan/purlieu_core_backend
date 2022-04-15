import axios from "axios";
import khaltiConfigs from "configs/payment.providers/khalti.configs";

const khaltiApi = axios.create({
	baseURL: khaltiConfigs.KHALTI_VERIFICATION_API,
	headers: {
		Authorization: `Key ${khaltiConfigs.KHALTI_SECRET_KEY}`,
	},
});

khaltiApi.interceptors.response.use(
	(resp) => {
		console.log(resp.data);
		if (resp.data.error_key) throw new Error("Verification failed.");
		return resp;
	},
	(err) => {
		console.log({ err: err.response.data });

		throw err.response?.data || err;
	}
);

export default khaltiApi;
