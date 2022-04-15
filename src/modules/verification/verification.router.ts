import { Router } from "express";
import Container from "typedi";
import VerificationController from "./verification.controller";

const router = Router();
const controller = Container.get(VerificationController);

// routes
router.post("/khalti", controller.postVerifyKhalti);
router.post("/stripe", controller.postVerifyStripe);

export default router;
