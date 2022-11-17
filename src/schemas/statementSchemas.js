import joi from "joi";

export const validateStatement = (obj) => {
  const schema = joi.object({
    description: joi.string().required(),
    amount: joi.number().required(),
    transaction: joi.string().valid("in", "out").required(),
  });

  return schema.validate(obj, { abortEarly: false });
};
