import { ObjectID } from "bson";
import dayjs from "dayjs";
import { sessionsCollection, statementsCollection } from "../app.js";
import { validateStatement } from "../schemas/statementSchemas.js";

export const getStatement = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const session = await sessionsCollection.findOne({ token: token });
    const records = await statementsCollection
      .find({
        ownerId: ObjectID(session.userId),
      })
      .toArray();
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

  const { error } = validateStatement(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  try {
    const session = await sessionsCollection.findOne({ token: token });
    if (!session) return res.sendStatus(401);

    await statementsCollection.insertOne({
      ownerId: session.userId,
      date: dayjs(Date.now()).format("DD/MM"),
      ...body,
    });

    res.send("ok");
  } catch (error) {
    console.log(error);
  }
};
