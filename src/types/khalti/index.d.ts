export interface KhVerificationPayload {
	token: string;
	amount: number;
}

export interface KhUser {
	idx: string;
	name: string;
	mobile: string;
}

export interface KhState {
	idx: string;
	name: string;
	template: string;
}

export interface KhType {
	idx: string;
	name: string;
}

export interface KhVerificationResponse {
	idx: string;
	amount: number;
	fee_amount: number;
	refunded: boolean;
	created_on: string;
	ebanker?: any;
	type: KhType;
	state: KhState;
	user: KhUser;
	merchant: KhUser;
	token: Array<String>;
	error_key: string;
}
