import {
  addStatement,
  deleteStatement,
  getStatement,
} from "../controllers/statement.controllers.js";
import { validateToken } from "../middlewares/validateToken.js";

import { Router } from "express";

const router = Router();

router.use(validateToken);
router.get("/statement", getStatement);
router.post("/statement", addStatement);
router.delete("/statement/:id", deleteStatement);

export default router;
