import { ObjectID } from "bson";
import dayjs from "dayjs";
import { sessionsCollection, statementsCollection } from "../database/db.js";
import { validateStatementSchema } from "../schemas/statementSchemas.js";

export const getStatement = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await sessionsCollection.findOne({ token: token });
    if (!session) return res.sendStatus(401);

    const records = await statementsCollection
      .find({
        ownerId: ObjectID(session.userId),
      })
      .toArray();

    records.forEach((r) => delete r.ownerId);

    res.send(records);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const addStatement = async (req, res) => {
  const body = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const { error } = validateStatementSchema(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  try {
    const session = await sessionsCollection.findOne({ token: token });
    if (!session) return res.sendStatus(401);

    await statementsCollection.insertOne({
      timestamp: Date.now(),
      ownerId: session.userId,
      date: dayjs(Date.now()).format("DD/MM"),
      ...body,
    });

    res.send(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteStatement = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await sessionsCollection.findOne({ token: token });
    if (!session) return res.sendStatus(401);

    const record = await statementsCollection.findOne({ _id: ObjectID(id) });
    if (!record) res.sendStatus(404);

    await statementsCollection.deleteOne({ _id: record._id });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
