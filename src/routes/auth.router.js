import { signIn, signUp } from "../controllers/auth.controllers.js";
import { Router } from "express";
import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

export default router;
