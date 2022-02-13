import { Router } from "express";
import adminAuthMdlwr from "middlewares/adminAuth.mdlwr";
import Container from "typedi";
import CAppsController from "./capps.controller";

const router = Router();

const controller = Container.get(CAppsController);

// get
router.get("/", adminAuthMdlwr, controller.getHome);
router.get("/list", adminAuthMdlwr, controller.getList);

// post
router.post("/create", adminAuthMdlwr, controller.postCreate);

// patch
router.patch("/:id/callback", adminAuthMdlwr, controller.postUpdateCallbackUrl);

export default router;
