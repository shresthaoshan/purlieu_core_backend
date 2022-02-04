import envConfigs from "configs/env.configs";
import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
	res.json(envConfigs);
});

export default router;
