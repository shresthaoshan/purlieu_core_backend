import envConfigs from "configs/env.configs";
import { Router } from "express";
import appAuthMdlwr from "middlewares/appAuth.mdlwr";

import adminRouter from "modules/admins/admin.router";
import cappsRouter from "modules/capps/capps.router";
import verificationRouter from "modules/verification/verification.router";

const router = Router();

router.get("/", (_, res) => {
	res.json(envConfigs);
});

router.use("/admin", adminRouter);
router.use("/apps", cappsRouter);
router.use("/verification", appAuthMdlwr, verificationRouter);

export default router;
