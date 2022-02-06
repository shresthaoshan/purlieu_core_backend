import envConfigs from "configs/env.configs";
import { Router } from "express";

import adminRouter from "modules/admins/admin.router";

const router = Router();

router.get("/", (_, res) => {
	res.json(envConfigs);
});

router.use("/admin", adminRouter);

export default router;
