import { Service } from "typedi";
import { KhVerificationPayload, KhVerificationResponse } from "types/khalti";
import khaltiApi from "utils/apis/khalti.api";

@Service()
export class KhaltiService {
	constructor(private readonly api = khaltiApi) {}

	verify = (payload: KhVerificationPayload): Promise<KhVerificationResponse> => this.api.post("/", payload);
}
