import { Router } from "express";
import adminAuthMdlwr from "middlewares/adminAuth.mdlwr";
import Container from "typedi";
import CAppsController from "./capps.controller";
import HistoryController from "./history/history.controller";

const router = Router();

const controller = Container.get(CAppsController);
const historyController = Container.get(HistoryController);

// get
router.get("/", adminAuthMdlwr, controller.getHome);
router.get("/list", adminAuthMdlwr, controller.getList);
router.get("/:id", adminAuthMdlwr, controller.getAppDetails);

// post
router.post("/create", adminAuthMdlwr, controller.postCreate);

// patch
router.patch("/:id/callback", adminAuthMdlwr, controller.postUpdateCallbackUrl);

// history
router.get("/:id/history", adminAuthMdlwr, historyController.check);

export default router;
