import joi from "joi";

export const addStatementSchema = (obj) => {
  const schema = joi.object({
    description: joi.string().required(),
    amount: joi.number().required(),
    type: joi.string().valid("in", "out").required(),
  });

  return schema.validate(obj, { abortEarly: false });
};
