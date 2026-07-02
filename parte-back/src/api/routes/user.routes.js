import { Router } from "express";
import { createAdminUser, showAllUsers } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", showAllUsers)

router.post("/", createAdminUser);

export default router