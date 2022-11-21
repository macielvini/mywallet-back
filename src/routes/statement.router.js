import { Router } from "express";
import {
  addStatement,
  deleteStatement,
  getStatement,
  updateStatement,
} from "../controllers/statement.controllers.js";

import { validateToken } from "../middlewares/validateToken.js";
import { validateStatementSchema } from "../middlewares/addStatementSchema.js";
import { validateStatementId } from "../middlewares/validateStatementId.js";

const router = Router();

router.use(validateToken);
router.get("/statement", getStatement);
router.delete("/statement/:id", validateStatementId, deleteStatement);
router.put("/statement/:id", updateStatement);
// router.use(validateStatementSchema);
router.post("/statement", validateStatementSchema, addStatement);

export default router;
