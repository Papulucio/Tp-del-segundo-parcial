import { Router } from "express";
import { showAllventas } from "../controllers/ventas.controllers.js";

const router = Router();

router.get("/", showAllventas)

export default router