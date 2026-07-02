import { Router } from "express";
import { createVenta, showAllventas } from "../controllers/ventas.controllers.js";

const router = Router();

router.get("/", showAllventas)

router.post("/", createVenta)

export default router