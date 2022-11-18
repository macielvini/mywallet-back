import { ObjectID } from "bson";
import dayjs from "dayjs";
import { statementsCollection } from "../database/db.js";

export const getStatement = async (req, res) => {
  const { session } = req;

  try {
    const records = await statementsCollection
      .find({
        ownerId: ObjectID(session.userId),
      })
      .toArray();
    records.forEach((r) => delete r.ownerId);

    res.send(records.reverse());
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const addStatement = async (req, res) => {
  const body = req.body;
  const { session } = req;

  try {
    await statementsCollection.insertOne({
      timestamp: Date.now(),
      ownerId: session.userId,
      date: dayjs(Date.now()).format("DD/MM"),
      ...body,
    });

    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteStatement = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await statementsCollection.findOne({ _id: ObjectID(id) });
    if (!record) res.sendStatus(404);

    await statementsCollection.deleteOne({ _id: record._id });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
