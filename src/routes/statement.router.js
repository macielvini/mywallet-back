import {
  addStatement,
  getStatement,
} from "../controllers/statement.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/statement", getStatement);
router.post("/statement", addStatement);

export default router;
