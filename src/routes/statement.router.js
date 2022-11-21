import { Router } from "express";
import {
  addStatement,
  deleteStatement,
  getStatement,
  updateStatement,
} from "../controllers/statement.controllers.js";

import { validateToken } from "../middlewares/tokenValidation.middleware.js";
import { validateStatementSchema } from "../middlewares/statementValidation.middleware.js";
import { validateStatementId } from "../middlewares/statementIdValidation.middleware.js";

const router = Router();

router.use(validateToken);
router.get("/statement", getStatement);
router.delete("/statement/:id", validateStatementId, deleteStatement);
router.put("/statement/:id", validateStatementId, updateStatement);
// router.use(validateStatementSchema);
router.post("/statement", validateStatementSchema, addStatement);

export default router;
