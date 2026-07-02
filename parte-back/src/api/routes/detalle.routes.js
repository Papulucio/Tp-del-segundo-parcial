import { Router } from "express";
import { showAlldetalles } from "../controllers/detalles.controllers.js";

const router = Router();

router.get("/", showAlldetalles)

export default router