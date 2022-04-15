export interface PaymentVerificationRequest {
	amount: number;
	receipent: string;
	remarks: string;
	token?: string;
}
