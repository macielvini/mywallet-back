import { addStatementSchema } from "../models/statementSchemas.js";

export const validateStatementSchema = async (req, res, next) => {
  const body = req.body;
  const { error } = addStatementSchema(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  next();
};
