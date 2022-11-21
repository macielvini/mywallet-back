import { ObjectId } from "mongodb";
import { BSONTypeError } from "bson";
import { statementsCollection } from "../database/db.js";

export const validateStatementId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const statementRecord = await statementsCollection.findOne({
      _id: ObjectId(id),
    });
    console.log(statementRecord);
    if (!statementRecord) return res.sendStatus(404);

    req.record = statementRecord;
  } catch (error) {
    if (error instanceof BSONTypeError) {
      return res.status(422).send({ message: "Invalid id" });
    }
    return res.sendStatus(500);
  }

  next();
};
