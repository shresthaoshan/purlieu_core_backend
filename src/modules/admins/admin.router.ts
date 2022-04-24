import { Router } from "express";
import adminAuthMdlwr from "middlewares/adminAuth.mdlwr";
import Container from "typedi";
import AdminController from "./admin.controller";

const router = Router();

const controller = Container.get(AdminController);

router.get("/", adminAuthMdlwr, controller.getHome);

router.post("/register", controller.postCreate);
router.post("/login", controller.postLogin);
router.post("/token-refresh", controller.postRefreshToken);
router.post("/token-validate", adminAuthMdlwr, (_, res) => res.status(200).end());

export default router;
