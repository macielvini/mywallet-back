import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sessionsCollection, usersCollection } from "../database/db.js";
import { signinSchema, signupSchema } from "../schemas/authSchemas.js";
import { ObjectId } from "mongodb";

export const signUp = async (req, res) => {
  const body = req.body;

  const { error } = signupSchema(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  const encryptedPassword = bcrypt.hashSync(body.password, 10);

  try {
    await usersCollection.insertOne({
      ...body,
      password: encryptedPassword,
      lastStatus: Date.now(),
    });
    res.sendStatus(201);
  } catch (error) {
    res.send(500);
  }
};

export const signIn = async (req, res) => {
  const body = req.body;

  const { error } = signinSchema(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  try {
    const user = await usersCollection.findOne({ email: body.email });
    if (!user) {
      return res.sendStatus(401);
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.sendStatus(401);
    }

    const session = await sessionsCollection.findOne({
      userId: ObjectId(user._id),
    });

    if (!session?.token) {
      const newToken = uuid();
      await sessionsCollection.insertOne({
        userId: user._id,
        token: newToken,
      });

      return res.send({ token: newToken });
    }

    res.send({ token: session.token });
  } catch (error) {
    res.sendStatus(500);
  }
};
