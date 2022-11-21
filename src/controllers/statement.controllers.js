import { ObjectId } from "mongodb";
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
    records.forEach((r) => {
      delete r.ownerId;
      delete r.timestamp;
    });

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
  const { record } = req;

  try {
    await statementsCollection.deleteOne({ _id: record._id });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateStatement = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const statementItem = await statementsCollection.findOne({
      _id: ObjectId(id),
    });

    await statementsCollection.updateOne(
      { _id: statementItem._id },
      { $set: body }
    );

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
