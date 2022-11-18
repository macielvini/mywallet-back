import { Router } from "express";
import {
  addStatement,
  deleteStatement,
  getStatement,
} from "../controllers/statement.controllers.js";

import { validateToken } from "../middlewares/validateToken.js";
import { validateStatementSchema } from "../middlewares/addStatementSchema.js";

const router = Router();

router.use(validateToken);
router.get("/statement", getStatement);
router.post("/statement", validateStatementSchema, addStatement);
router.delete("/statement/:id", deleteStatement);

export default router;
