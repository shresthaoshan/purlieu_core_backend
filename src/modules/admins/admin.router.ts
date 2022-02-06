import { Router } from "express";
import adminAuthMdlwr from "middlewares/adminAuth.mdlwr";
import Container from "typedi";
import AdminController from "./admins.controller";

const router = Router();

const controller = Container.get(AdminController);

router.get("/", adminAuthMdlwr, controller.getHome);

router.post("/register", controller.postCreate);
router.post("/login", controller.postLogin);

export default router;
