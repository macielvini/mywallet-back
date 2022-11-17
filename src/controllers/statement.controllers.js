import { ObjectID } from "bson";
import { sessionsCollection, statementsCollection } from "../app.js";

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
