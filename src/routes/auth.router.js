import { signIn, signUp } from "../controllers/auth.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
