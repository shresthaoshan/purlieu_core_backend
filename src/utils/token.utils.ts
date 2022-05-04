import envConfigs from "configs/env.configs";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

const commonSignOpts: SignOptions = {
	algorithm: "HS512",
};
const commonVerifyOpts: VerifyOptions = {
	algorithms: ["HS512"],
};

const signAccessToken = async (payload: any) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, envConfigs.ACCESS_TOKEN_SECRET, { expiresIn: "30s", ...commonSignOpts }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

const verifyAccessToken = async (token: any) => {
	return new Promise((resolve) => {
		jwt.verify(token, envConfigs.ACCESS_TOKEN_SECRET, commonVerifyOpts, (err, payload) => {
			if (err) resolve(false);
			resolve(payload);
		});
	});
};

const signRefreshToken = async (payload: any) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, envConfigs.REFRESH_TOKEN_SECRET, { expiresIn: "3d", ...commonSignOpts }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

const verifyRefreshToken = async (token: any) => {
	return new Promise((resolve) => {
		jwt.verify(token, envConfigs.REFRESH_TOKEN_SECRET, commonVerifyOpts, (err, payload) => {
			if (err) resolve(false);
			resolve(payload);
		});
	});
};

export default {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
};
