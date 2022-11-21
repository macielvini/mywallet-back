import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sessionsCollection, usersCollection } from "../database/db.js";
import { ObjectId } from "mongodb";

export const signUp = async (req, res) => {
  const body = req.body;

  const encryptedPassword = bcrypt.hashSync(body.password, 10);

  try {
    await usersCollection.insertOne({
      ...body,
      password: encryptedPassword,
      lastStatus: Date.now(),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const signIn = async (req, res) => {
  const { user } = req;

  try {
    const userSession = await sessionsCollection.findOne({
      userId: ObjectId(user._id),
    });

    if (!userSession?.token) {
      const newToken = uuid();
      await sessionsCollection.insertOne({
        userId: user._id,
        token: newToken,
      });

      return res.send({ token: newToken });
    }

    res.send({ token: userSession.token, name: user.name });
  } catch (error) {
    res.sendStatus(500);
  }
};
